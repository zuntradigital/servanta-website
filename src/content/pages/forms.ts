import type { FieldConfig, FormMessages } from "@/components/forms/fields";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/locales";

/**
 * Form field sets (website_forms.fields) and form messages, per locale.
 * Arabic copy drafted for this build; needs review by a native Arabic copy
 * editor before launch.
 */
export type FormDefinition = { fields: FieldConfig[]; messages: FormMessages };
export type FormSet = { contact: FormDefinition; demo: FormDefinition; sales: FormDefinition; legal: FormDefinition };

/** "Not connected" copy points to the configured email when one exists. */
function notConfigured(locale: Locale) {
  const email = brand.contact.email;
  if (locale === "ar") {
    return {
      notConfiguredTitle: "هذا النموذج غير متصل بعد",
      notConfiguredBody: email
        ? `لم يتم إرسال بياناتك. الإرسال عبر الإنترنت غير متاح حاليًا، لذا يرجى مراسلتنا على ${email}.`
        : "لم يتم إرسال بياناتك. الإرسال عبر الإنترنت غير متاح حاليًا، لذا يرجى المحاولة لاحقًا.",
    };
  }
  return {
    notConfiguredTitle: "This form isn't connected yet",
    notConfiguredBody: email
      ? `Your details were not sent. Online submissions aren't available yet, so please email us at ${email}.`
      : "Your details were not sent. Online submissions aren't available yet, so please try again later.",
  };
}

function en(): FormSet {
  const base = {
    required: "This field is required.",
    invalidEmail: "Enter a valid email address.",
    invalidPhone: "Enter a valid phone number.",
    tooLong: "This entry is too long.",
    submitting: "Sending…",
    requiredLegend: "Required field",
    errorTitle: "We couldn't send your message.",
    errorBody: "Something went wrong on our side. Your details are still here — please try again.",
    privacyPrefix: "By submitting, you agree to our",
    privacyLink: "Privacy Policy",
    selectPlaceholder: "Select an option",
    ...notConfigured("en"),
  };
  const name: FieldConfig = { name: "name", type: "text", label: "Full name", required: true, autoComplete: "name", maxLength: 120 };
  const email: FieldConfig = { name: "email", type: "email", label: "Work email", required: true, placeholder: "you@company.com", autoComplete: "email", maxLength: 200 };
  const phone: FieldConfig = { name: "phone", type: "phone", label: "Phone", placeholder: "+966 5X XXX XXXX", autoComplete: "tel", maxLength: 30 };
  const teamSize: FieldConfig = {
    name: "team_size",
    type: "select",
    label: "Team size",
    options: [
      { value: "1-10", label: "1–10 people" },
      { value: "11-50", label: "11–50 people" },
      { value: "51-200", label: "51–200 people" },
      { value: "200+", label: "More than 200 people" },
    ],
  };

  return {
    contact: {
      fields: [
        name,
        email,
        { name: "company", type: "text", label: "Company", autoComplete: "organization", maxLength: 160 },
        phone,
        {
          name: "topic",
          type: "select",
          label: "Topic",
          required: true,
          options: [
            { value: "sales", label: "Sales question" },
            { value: "support", label: "Support for an existing account" },
            { value: "partnership", label: "Partnership" },
            { value: "other", label: "Something else" },
          ],
        },
        { name: "message", type: "textarea", label: "Message", required: true, placeholder: "How can we help?", maxLength: 4000 },
      ],
      messages: {
        ...base,
        submit: "Send Message",
        successTitle: "Thank you — your message has been sent.",
        successBody: "Our team will get back to you by email.",
        sendAnother: "Send another message",
      },
    },
    demo: {
      fields: [
        name,
        email,
        { name: "company", type: "text", label: "Company", required: true, autoComplete: "organization", maxLength: 160 },
        phone,
        teamSize,
        { name: "message", type: "textarea", label: "What would you like to see?", placeholder: "Tell us about your operation (optional)", maxLength: 4000 },
      ],
      messages: {
        ...base,
        errorTitle: "We couldn't send your request.",
        submit: "Request Demo",
        successTitle: "Thank you — your demo request has been received.",
        successBody: "Our team will contact you by email to arrange a time.",
      },
    },
    sales: {
      fields: [
        name,
        email,
        { name: "company", type: "text", label: "Company", required: true, autoComplete: "organization", maxLength: 160 },
        phone,
        teamSize,
        // Plan options are filled from the Pricing API on the Request Demo page (only "Not sure yet" lives here).
        {
          name: "plan",
          type: "select",
          label: "Plan of interest",
          options: [
            { value: "unsure", label: "Not sure yet" },
          ],
        },
        { name: "message", type: "textarea", label: "What would you like to discuss?", required: true, placeholder: "Your operation, requirements or questions about plans", maxLength: 4000 },
        {
          name: "privacy_consent",
          type: "checkbox",
          label: "I have read and agree to the Privacy Policy.",
          consent: { before: "I have read and agree to the ", link: "Privacy Policy", after: "." },
          required: true,
          requiredMessage: "Please agree to the Privacy Policy to continue.",
        },
      ],
      messages: {
        ...base,
        errorTitle: "We couldn't send your request.",
        submit: "Contact Sales",
        successTitle: "Thank you — your request has been sent to our sales team.",
        successBody: "Our team will contact you by email.",
      },
    },
    // Legal & privacy requests (MOD-LEGAL-CENTER-WEB §20, §37): only the data the request needs.
    legal: {
      fields: [
        name,
        email,
        {
          name: "request_type",
          type: "select",
          label: "Request type",
          required: true,
          options: [
            { value: "legal_inquiry", label: "Legal inquiry" },
            { value: "privacy_inquiry", label: "Privacy inquiry" },
            { value: "access_request", label: "Data access request" },
            { value: "correction_request", label: "Data correction request" },
            { value: "deletion_request", label: "Data deletion request" },
            { value: "marketing_request", label: "Marketing communications request" },
            { value: "legal_notice", label: "Legal notice" },
            { value: "complaint", label: "Complaint" },
            { value: "contract_question", label: "Contract or legal question" },
            { value: "security_escalation", label: "Security or legal escalation" },
          ],
        },
        { name: "message", type: "textarea", label: "Your request", required: true, maxLength: 4000 },
      ],
      messages: {
        ...base,
        submit: "Send Request",
        successTitle: "Thank you — your request has been sent.",
        successBody: "We will reply by email.",
      },
    },
  };
}

function ar(): FormSet {
  const base = {
    required: "هذا الحقل مطلوب.",
    invalidEmail: "أدخل بريدًا إلكترونيًا صالحًا.",
    invalidPhone: "أدخل رقم هاتف صالحًا.",
    tooLong: "هذا الإدخال طويل جدًا.",
    submitting: "جارٍ الإرسال…",
    requiredLegend: "حقل مطلوب",
    errorTitle: "تعذّر إرسال رسالتك.",
    errorBody: "حدث خطأ من جهتنا. بياناتك ما زالت محفوظة هنا — يرجى المحاولة مرة أخرى.",
    privacyPrefix: "بالإرسال، فإنك توافق على",
    privacyLink: "سياسة الخصوصية",
    selectPlaceholder: "اختر خيارًا",
    ...notConfigured("ar"),
  };
  const name: FieldConfig = { name: "name", type: "text", label: "الاسم الكامل", required: true, autoComplete: "name", maxLength: 120 };
  const email: FieldConfig = { name: "email", type: "email", label: "البريد الإلكتروني للعمل", required: true, placeholder: "you@company.com", autoComplete: "email", maxLength: 200 };
  const phone: FieldConfig = { name: "phone", type: "phone", label: "الهاتف", placeholder: "+966 5X XXX XXXX", autoComplete: "tel", maxLength: 30 };
  const teamSize: FieldConfig = {
    name: "team_size",
    type: "select",
    label: "حجم الفريق",
    options: [
      { value: "1-10", label: "1–10 أشخاص" },
      { value: "11-50", label: "11–50 شخصًا" },
      { value: "51-200", label: "51–200 شخص" },
      { value: "200+", label: "أكثر من 200 شخص" },
    ],
  };

  return {
    contact: {
      fields: [
        name,
        email,
        { name: "company", type: "text", label: "الشركة", autoComplete: "organization", maxLength: 160 },
        phone,
        {
          name: "topic",
          type: "select",
          label: "الموضوع",
          required: true,
          options: [
            { value: "sales", label: "استفسار عن المبيعات" },
            { value: "support", label: "دعم لحساب قائم" },
            { value: "partnership", label: "شراكة" },
            { value: "other", label: "موضوع آخر" },
          ],
        },
        { name: "message", type: "textarea", label: "الرسالة", required: true, placeholder: "كيف يمكننا مساعدتك؟", maxLength: 4000 },
      ],
      messages: {
        ...base,
        submit: "إرسال الرسالة",
        successTitle: "شكرًا لك — تم إرسال رسالتك.",
        successBody: "سيتواصل معك فريقنا عبر البريد الإلكتروني.",
        sendAnother: "إرسال رسالة أخرى",
      },
    },
    demo: {
      fields: [
        name,
        email,
        { name: "company", type: "text", label: "الشركة", required: true, autoComplete: "organization", maxLength: 160 },
        phone,
        teamSize,
        { name: "message", type: "textarea", label: "ما الذي تودّ رؤيته؟", placeholder: "أخبرنا عن طبيعة عملك (اختياري)", maxLength: 4000 },
      ],
      messages: {
        ...base,
        errorTitle: "تعذّر إرسال طلبك.",
        submit: "اطلب العرض التوضيحي",
        successTitle: "شكرًا لك — تم استلام طلب العرض التوضيحي.",
        successBody: "سيتواصل معك فريقنا عبر البريد الإلكتروني لتحديد موعد.",
      },
    },
    sales: {
      fields: [
        name,
        email,
        { name: "company", type: "text", label: "الشركة", required: true, autoComplete: "organization", maxLength: 160 },
        phone,
        teamSize,
        {
          name: "plan",
          type: "select",
          label: "الباقة المطلوبة",
          options: [
            { value: "unsure", label: "لم أحدد بعد" },
          ],
        },
        { name: "message", type: "textarea", label: "ما الذي تودّ مناقشته؟", required: true, placeholder: "طبيعة عملك أو متطلباتك أو أسئلتك عن الباقات", maxLength: 4000 },
        {
          name: "privacy_consent",
          type: "checkbox",
          label: "لقد قرأت سياسة الخصوصية وأوافق عليها.",
          consent: { before: "لقد قرأت ", link: "سياسة الخصوصية", after: " وأوافق عليها." },
          required: true,
          requiredMessage: "يُرجى الموافقة على سياسة الخصوصية للمتابعة.",
        },
      ],
      messages: {
        ...base,
        errorTitle: "تعذّر إرسال طلبك.",
        submit: "تواصل مع المبيعات",
        successTitle: "شكرًا لك — تم إرسال طلبك إلى فريق المبيعات.",
        successBody: "سيتواصل معك فريقنا عبر البريد الإلكتروني.",
      },
    },
    legal: {
      fields: [
        name,
        email,
        {
          name: "request_type",
          type: "select",
          label: "نوع الطلب",
          required: true,
          options: [
            { value: "legal_inquiry", label: "استفسار قانوني" },
            { value: "privacy_inquiry", label: "استفسار عن الخصوصية" },
            { value: "access_request", label: "طلب الوصول إلى البيانات" },
            { value: "correction_request", label: "طلب تصحيح البيانات" },
            { value: "deletion_request", label: "طلب حذف البيانات" },
            { value: "marketing_request", label: "طلب بشأن الرسائل التسويقية" },
            { value: "legal_notice", label: "إشعار قانوني" },
            { value: "complaint", label: "شكوى" },
            { value: "contract_question", label: "سؤال حول العقود أو المسائل القانونية" },
            { value: "security_escalation", label: "تصعيد أمني أو قانوني" },
          ],
        },
        { name: "message", type: "textarea", label: "طلبك", required: true, maxLength: 4000 },
      ],
      messages: {
        ...base,
        submit: "إرسال الطلب",
        successTitle: "شكرًا لك — تم إرسال طلبك.",
        successBody: "سنرد عليك عبر البريد الإلكتروني.",
      },
    },
  };
}

export function getForms(locale: Locale): FormSet {
  return locale === "ar" ? ar() : en();
}

/** English sets, kept for existing imports. */
export const contactForm = en().contact;
export const demoForm = en().demo;
