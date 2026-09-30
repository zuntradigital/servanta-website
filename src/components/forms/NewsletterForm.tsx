"use client";

import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { submitForm } from "@/lib/forms";
import { cx } from "@/lib/cx";
import styles from "./NewsletterForm.module.css";

export type NewsletterLabels = {
  heading: string;
  body: string;
  emailLabel: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  required: string;
  invalid: string;
  errorTitle: string;
  errorBody: string;
  notConfiguredTitle: string;
  notConfiguredBody: string;
  privacyPrefix: string;
  privacyLink: string;
};

type Status = "idle" | "submitting" | "success" | "error" | "not_configured";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter (spec §9/§12): a single labelled email field and Submit in an
 * inline layout, with the same validation, submitting, success and error
 * treatment as the other forms. Posts form key `newsletter`.
 */
export function NewsletterForm({ labels, locale, privacyHref }: { labels: NewsletterLabels; locale: string; privacyHref: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const headingId = `${id}-heading`;
  const errorId = `${id}-error`;

  const validate = (value: string) => {
    const text = value.trim();
    if (!text) return labels.required;
    if (!EMAIL.test(text) || text.length > 200) return labels.invalid;
    return undefined;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    const nextError = validate(email);
    setTouched(true);
    setError(nextError);
    if (nextError) {
      inputRef.current?.focus();
      return;
    }
    if (honeypot) {
      setStatus("success");
      return;
    }
    setStatus("submitting");
    const result = await submitForm("newsletter", { email: email.trim() }, locale);
    setStatus(result.ok ? "success" : result.reason === "not_configured" ? "not_configured" : "error");
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const submitting = status === "submitting";
  const shownError = touched ? error : undefined;

  return (
    <section className={styles.band} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id={headingId} className={styles.heading}>
            {labels.heading}
          </h2>
          <p className={styles.body}>{labels.body}</p>
        </div>

        {status === "success" ? (
          <div ref={resultRef} tabIndex={-1} className={styles.success} role="status">
            <CheckCircle2 size={22} strokeWidth={1.75} aria-hidden="true" />
            <div>
              <p className={styles.successTitle}>{labels.successTitle}</p>
              <p className={styles.successBody}>{labels.successBody}</p>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={onSubmit} noValidate aria-busy={submitting}>
            {(status === "error" || status === "not_configured") && (
              <div ref={resultRef} tabIndex={-1} className={styles.alert}>
                <Alert title={status === "error" ? labels.errorTitle : labels.notConfiguredTitle}>
                  {status === "error" ? labels.errorBody : labels.notConfiguredBody}
                </Alert>
              </div>
            )}
            <label htmlFor={`${id}-email`} className={styles.label}>
              {labels.emailLabel} <span aria-hidden="true" className={styles.required}>*</span>
            </label>
            <div className={styles.row}>
              <input
                ref={inputRef}
                id={`${id}-email`}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                aria-required="true"
                aria-invalid={shownError ? true : undefined}
                aria-describedby={shownError ? errorId : undefined}
                disabled={submitting}
                className={cx(styles.input, shownError && styles.inputError)}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (touched) setError(validate(event.target.value));
                }}
                onBlur={() => {
                  setTouched(true);
                  setError(validate(email));
                }}
              />
              <Button type="submit" loading={submitting} loadingLabel={labels.submitting} className={styles.submit}>
                {labels.submit}
              </Button>
            </div>
            {shownError && (
              <p id={errorId} className={styles.error}>
                <AlertCircle size={14} aria-hidden="true" />
                {shownError}
              </p>
            )}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor={`${id}-company-site`}>Website</label>
              <input id={`${id}-company-site`} name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            <p className={styles.privacy}>
              {labels.privacyPrefix} <Link href={privacyHref}>{labels.privacyLink}</Link>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
