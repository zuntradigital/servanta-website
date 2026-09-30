/** Fixed field-type catalog (17-WEBSITE-FORMS-LEADS-SRS BR-WEB-022). */
export type FieldType = "text" | "email" | "phone" | "textarea" | "select" | "checkbox";

export type FieldConfig = {
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  options?: Array<{ value: string; label: string }>;
  maxLength?: number;
  /** Checkbox label that links to the Privacy Policy: "{before}{link}{after}". */
  consent?: { before: string; link: string; after: string };
  /** Replaces the generic "required" message for this field. */
  requiredMessage?: string;
};

export type FormMessages = {
  required: string;
  invalidEmail: string;
  invalidPhone: string;
  tooLong: string;
  submit: string;
  submitting: string;
  requiredLegend: string;
  errorTitle: string;
  errorBody: string;
  /** Shown when no forms endpoint is configured (production builds). */
  notConfiguredTitle: string;
  notConfiguredBody: string;
  successTitle: string;
  successBody: string;
  sendAnother?: string;
  privacyPrefix: string;
  privacyLink: string;
  selectPlaceholder: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?[0-9\s().-]{7,20}$/;

export function validateField(field: FieldConfig, value: string | boolean, messages: FormMessages): string | undefined {
  if (field.type === "checkbox") {
    return field.required && value !== true ? (field.requiredMessage ?? messages.required) : undefined;
  }
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return field.required ? messages.required : undefined;
  if (field.maxLength && text.length > field.maxLength) return messages.tooLong;
  if (field.type === "email" && !EMAIL.test(text)) return messages.invalidEmail;
  if (field.type === "phone" && !PHONE.test(text)) return messages.invalidPhone;
  return undefined;
}
