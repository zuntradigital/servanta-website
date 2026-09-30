import Link from "next/link";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cx } from "@/lib/cx";
import type { FieldConfig } from "./fields";
import styles from "./LeadForm.module.css";

type FormFieldProps = {
  id: string;
  field: FieldConfig;
  value: string | boolean;
  error?: string;
  selectPlaceholder: string;
  onChange: (value: string | boolean) => void;
  onBlur: () => void;
  /** Target of a consent checkbox's Privacy Policy link. */
  privacyHref?: string;
};

/** Label above field, asterisk + aria-required, error below with icon (spec §12). */
export function FormField({ id, field, value, error, selectPlaceholder, onChange, onBlur, privacyHref }: FormFieldProps) {
  const errorId = `${id}-error`;
  const common = {
    id,
    name: field.name,
    required: field.required,
    "aria-required": field.required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    onBlur,
  };

  const errorMessage = error && (
    <p id={errorId} className={styles.error}>
      <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
      {error}
    </p>
  );

  if (field.type === "checkbox") {
    return (
      <div className={styles.field}>
        <label className={styles.checkbox} htmlFor={id}>
          <input {...common} type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} />
          <span>
            {field.consent && privacyHref ? (
              <>
                {field.consent.before}
                <Link href={privacyHref}>{field.consent.link}</Link>
                {field.consent.after}
              </>
            ) : (
              field.label
            )}
            {field.required && <span className={styles.required} aria-hidden="true"> *</span>}
          </span>
        </label>
        {errorMessage}
      </div>
    );
  }

  const text = typeof value === "string" ? value : "";
  const inputClass = cx(styles.input, error && styles.inputError);

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {field.required && (
          <span className={styles.required} aria-hidden="true">
            *{" "}
          </span>
        )}
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          {...common}
          className={cx(inputClass, styles.textarea)}
          rows={5}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.type === "select" ? (
        <div className={styles.selectWrap}>
          <select {...common} className={cx(inputClass, styles.select, !text && styles.selectEmpty)} value={text} onChange={(e) => onChange(e.target.value)}>
            <option value="">{selectPlaceholder}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className={styles.selectIcon} size={16} aria-hidden="true" />
        </div>
      ) : (
        <input
          {...common}
          className={inputClass}
          type={field.type === "phone" ? "tel" : field.type}
          inputMode={field.type === "phone" ? "tel" : field.type === "email" ? "email" : undefined}
          dir={field.type === "email" || field.type === "phone" ? "ltr" : undefined}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          maxLength={field.maxLength}
          value={text}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {errorMessage}
    </div>
  );
}
