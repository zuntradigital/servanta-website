import { campaignParams, track, type AnalyticsEvent } from "@/lib/analytics";

export type FormKey = "contact_us" | "request_demo" | "contact_sales" | "newsletter" | "legal_request";

/**
 * `not_configured`: no forms endpoint is set, so nothing can be delivered.
 * `failed`: the endpoint rejected the request or could not be reached.
 */
export type SubmitResult = { ok: true; simulated?: boolean } | { ok: false; reason: "not_configured" | "failed" };

/**
 * Whether submissions may be simulated when no endpoint exists. Only ever in
 * development (`next dev`), so a production build can never report a lead as
 * sent when it wasn't (audit: forms silently lost every lead).
 * NEXT_PUBLIC_FORMS_SIMULATE=false turns simulation off in dev too.
 */
function canSimulate(): boolean {
  return process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_FORMS_SIMULATE !== "false";
}

export function formsEndpoint(): string | undefined {
  return process.env.NEXT_PUBLIC_FORMS_ENDPOINT || undefined;
}

const submitEvents: Partial<Record<FormKey, AnalyticsEvent>> = {
  contact_us: "contact_form_submit",
  request_demo: "request_demo_submit",
  contact_sales: "contact_sales_submit",
};

/**
 * Successful-submission events (WEB-MKT-SRS-002 §84). Only the form key and
 * campaign attribution are sent, never field values. `lead_conversion` is
 * emitted by the backend once a CRM lead exists, so it is not fired here.
 */
function trackSubmission(formKey: FormKey) {
  const event = submitEvents[formKey];
  if (event) track(event, { content_id: formKey, ...campaignParams() });
}

/**
 * BACKEND-DEPENDENT. Sends a submission to the configured forms endpoint
 * (17-WEBSITE-FORMS-LEADS-SRS). Server-side validation, storage, rate
 * limiting, staff notification and CRM sync all live behind that endpoint;
 * this client posts `{ submission_id, submitted_at, form_key, locale, page_url,
 * attribution, values }` as JSON (§64). The backend remains authoritative for
 * the stored submission ID, timestamp and status.
 */
export async function submitForm(formKey: FormKey, values: Record<string, string | boolean>, locale: string): Promise<SubmitResult> {
  const endpoint = formsEndpoint();

  if (!endpoint) {
    if (canSimulate()) {
      console.warn(`[forms] NEXT_PUBLIC_FORMS_ENDPOINT is not set; simulating "${formKey}" submission (development only).`);
      await new Promise((resolve) => setTimeout(resolve, 900));
      return { ok: true, simulated: true };
    }
    return { ok: false, reason: "not_configured" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        submission_id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        submitted_at: new Date().toISOString(),
        form_key: formKey,
        locale,
        page_url: window.location.href,
        attribution: campaignParams(),
        values,
      }),
    });
    if (!response.ok) return { ok: false, reason: "failed" };
    trackSubmission(formKey);
    return { ok: true };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
