"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { submitForm, type FormKey } from "@/lib/forms";
import { cx } from "@/lib/cx";
import { validateField, type FieldConfig, type FormMessages } from "./fields";
import { FormField } from "./FormField";
import styles from "./LeadForm.module.css";

type Values = Record<string, string | boolean>;

/** Form-start events (WEB-MKT-SRS-002 §84), fired once on first interaction. */
const startEvents: Partial<Record<FormKey, AnalyticsEvent>> = {
  request_demo: "request_demo_start",
  contact_sales: "contact_sales_start",
};
type Status = "idle" | "submitting" | "success" | "error" | "not_configured";

type LeadFormProps = {
  formKey: FormKey;
  fields: FieldConfig[];
  messages: FormMessages;
  privacyHref: string;
  locale: string;
  /** Prefilled values, e.g. the plan chosen on the pricing page. */
  defaults?: Record<string, string>;
  className?: string;
};

function initialValues(fields: FieldConfig[], defaults: Record<string, string> = {}): Values {
  return Object.fromEntries(fields.map((f) => [f.name, f.type === "checkbox" ? false : (defaults[f.name] ?? "")]));
}

/**
 * Configured form (spec §12): single-column fields, inline validation on
 * blur and submit, disabled fields while submitting, confirmation block on
 * success, retry-able inline error that keeps entered data.
 */
export function LeadForm({ formKey, fields, messages, privacyHref, locale, defaults, className }: LeadFormProps) {
  const [values, setValues] = useState<Values>(() => initialValues(fields, defaults));
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const idPrefix = useId();
  const started = useRef(false);

  const onFirstFocus = () => {
    if (started.current) return;
    started.current = true;
    const event = startEvents[formKey];
    if (event) track(event, { content_id: formKey });
  };

  const update = (name: string, value: string | boolean) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (touched[name]) {
      const field = fields.find((f) => f.name === name)!;
      setErrors((current) => ({ ...current, [name]: validateField(field, value, messages) }));
    }
  };

  const blur = (field: FieldConfig) => {
    setTouched((current) => ({ ...current, [field.name]: true }));
    setErrors((current) => ({ ...current, [field.name]: validateField(field, values[field.name], messages) }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors: Record<string, string | undefined> = {};
    for (const field of fields) nextErrors[field.name] = validateField(field, values[field.name], messages);
    setErrors(nextErrors);
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])));

    const firstInvalid = fields.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }

    // Honeypot filled: pretend success without sending (FR-WEB-018).
    if (honeypot) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    const result = await submitForm(formKey, values, locale);
    if (result.ok) {
      setStatus("success");
      requestAnimationFrame(() => successRef.current?.focus());
    } else {
      setStatus(result.reason === "not_configured" ? "not_configured" : "error");
      requestAnimationFrame(() => errorRef.current?.focus());
    }
  };

  if (status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} className={cx(styles.success, className)} role="status">
        <CheckCircle2 className={styles.successIcon} size={28} strokeWidth={1.75} aria-hidden="true" />
        <h2 className={styles.successTitle}>{messages.successTitle}</h2>
        <p className={styles.successBody}>{messages.successBody}</p>
        {messages.sendAnother && (
          <Button
            variant="secondary"
            onClick={() => {
              setValues(initialValues(fields, defaults));
              setErrors({});
              setTouched({});
              setStatus("idle");
            }}
          >
            {messages.sendAnother}
          </Button>
        )}
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} className={cx(styles.form, className)} onSubmit={onSubmit} onFocus={onFirstFocus} noValidate aria-busy={submitting}>
      {status === "error" && (
        <div ref={errorRef} tabIndex={-1} className={styles.errorWrap}>
          <Alert title={messages.errorTitle}>{messages.errorBody}</Alert>
        </div>
      )}
      {/* BACKEND-DEPENDENT: no forms endpoint configured, so nothing was sent. */}
      {status === "not_configured" && (
        <div ref={errorRef} tabIndex={-1} className={styles.errorWrap} data-testid="form-not-configured">
          <Alert title={messages.notConfiguredTitle}>{messages.notConfiguredBody}</Alert>
        </div>
      )}

      <p className={styles.legend}>
        <span aria-hidden="true">*</span> {messages.requiredLegend}
      </p>

      <fieldset className={styles.fieldset} disabled={submitting}>
        {fields.map((field) => (
          <FormField
            key={field.name}
            id={`${idPrefix}-${field.name}`}
            field={field}
            value={values[field.name]}
            error={touched[field.name] ? errors[field.name] : undefined}
            selectPlaceholder={messages.selectPlaceholder}
            onChange={(value) => update(field.name, value)}
            onBlur={() => blur(field)}
            privacyHref={privacyHref}
          />
        ))}

        {/* Honeypot: off-screen and hidden from assistive tech, not display:none (spec §12). */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor={`${idPrefix}-website`}>Website</label>
          <input
            id={`${idPrefix}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
      </fieldset>

      <Button type="submit" size="lg" className={styles.submit} loading={submitting} loadingLabel={messages.submitting}>
        {messages.submit}
      </Button>

      {/* Forms with an explicit consent checkbox don't repeat the passive notice. */}
      {!fields.some((field) => field.consent) && (
        <p className={styles.privacy}>
          {messages.privacyPrefix} <Link href={privacyHref}>{messages.privacyLink}</Link>.
        </p>
      )}
    </form>
  );
}
