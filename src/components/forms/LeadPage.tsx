import Link from "next/link";
import { Check } from "lucide-react";
import type { FieldConfig } from "@/components/forms/fields";
import { LeadForm } from "@/components/forms/LeadForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { href } from "@/config/routes";
import { getForms } from "@/content/pages/forms";
import { getLeadPagesContent } from "@/content/pages/lead-pages";
import type { Locale } from "@/i18n/locales";
import { getPublicPlan, getPublicPlans } from "@/lib/pricing";
import type { PublicPlan } from "@/lib/pricing-types";
import styles from "./LeadPage.module.css";

export type LeadVariantKey = "demo" | "sales";

/**
 * Contact Sales plan field: options are the published plans from the Pricing API,
 * and `?plan={code}` (the pricing page CTA) preselects one after checking it via
 * GET /api/v1/public/plans/{code}. If the API fails, the field keeps "Not sure yet".
 */
async function salesPlanField(locale: Locale, fields: FieldConfig[], planParam: string | string[] | undefined) {
  let plans: PublicPlan[] = [];
  let selected: string | undefined;
  try {
    plans = await getPublicPlans(locale);
    if (typeof planParam === "string") selected = (await getPublicPlan(planParam, locale))?.code;
  } catch (error) {
    console.error("[pricing]", error);
  }
  const withPlans = fields.map((field) =>
    field.name === "plan" ? { ...field, options: [...plans.map((p) => ({ value: p.code, label: p.name })), ...(field.options ?? [])] } : field,
  );
  return { fields: withPlans, defaults: selected ? { plan: selected } : undefined };
}

/**
 * Request a Demo and Contact Sales (WEB-MKT-SRS-002 §122–123): copy + form,
 * form above the fold. Each variant has its own route.
 */
export async function LeadPage({ locale, variant, plan }: { locale: Locale; variant: LeadVariantKey; plan?: string | string[] }) {
  const sales = variant === "sales";
  const content = getLeadPagesContent(locale);
  const copy = content[variant];
  const forms = getForms(locale);
  const form = sales ? forms.sales : forms.demo;
  const salesForm = sales ? await salesPlanField(locale, form.fields, plan) : null;

  return (
    <section className={styles.page} aria-labelledby="page-title">
      <Container className={styles.layout}>
        <div className={styles.copy}>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <h1 id="page-title" className={styles.title}>
            {copy.title}
          </h1>
          <p className={styles.lead}>{copy.lead}</p>
          <p className={styles.switch}>
            {copy.switchPrompt}{" "}
            <Link href={href(locale, sales ? "requestDemo" : "contactSales")} className={styles.switchLink} data-cta="">
              {copy.switchLink}
            </Link>
          </p>
        </div>

        <div className={styles.formCard}>
          <LeadForm
            key={sales ? `sales-${salesForm?.defaults?.plan ?? ""}` : "demo"}
            formKey={sales ? "contact_sales" : "request_demo"}
            fields={salesForm ? salesForm.fields : form.fields}
            defaults={salesForm?.defaults}
            messages={form.messages}
            privacyHref={href(locale, "privacy")}
            locale={locale}
          />
        </div>

        <div className={styles.details}>
          <h2 className={styles.listHeading}>{copy.expectHeading}</h2>
          <ul role="list" className={styles.list}>
            {copy.expect.map((item) => (
              <li key={item}>
                <Check size={18} strokeWidth={2} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.note}>{content.languagesNote}</p>
        </div>
      </Container>
    </section>
  );
}
