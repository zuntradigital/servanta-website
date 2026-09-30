import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/locales";

/**
 * Copy for the Request a Demo / Contact Sales page and the Contact page.
 * Request a Demo lives at /request-demo and Contact Sales at /contact-sales
 * (WEB-MKT-SRS-002 §101). Arabic copy drafted for this build;
 * needs review by a native Arabic copy editor before launch.
 */
type LeadVariant = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  switchPrompt: string;
  switchLink: string;
  expectHeading: string;
  expect: string[];
};

export type LeadPagesContent = {
  demo: LeadVariant;
  sales: LeadVariant;
  languagesNote: string;
  contact: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    subtitle: string;
    sectionLabel: string;
    formHeading: string;
    infoHeading: string;
    email: string;
    phone: string;
    address: string;
    demoPrompt: string;
    salesPrompt: string;
    faqPrompt: string;
    faqLink: string;
    socialLabel: string;
  };
};

const content: Record<Locale, LeadPagesContent> = {
  en: {
    demo: {
      metaTitle: "Request a Demo",
      metaDescription: `See how ${brand.name} connects contracts, scheduling, field work and billing for your operation.`,
      eyebrow: "Request a Demo",
      title: `See ${brand.name} with your own operation in mind`,
      lead: "Tell us a little about your business and we will arrange a walkthrough of the platform, focused on the way you work.",
      switchPrompt: "Have a question about plans or buying?",
      switchLink: "Contact Sales",
      expectHeading: "What to expect",
      expect: [
        "A walkthrough from contract to collected payment",
        "Time for your questions about fit, setup and plans",
        "A recommendation on where to start",
      ],
    },
    sales: {
      metaTitle: "Contact Sales",
      metaDescription: `Talk to the ${brand.name} sales team about plans, pricing and fit for your operation.`,
      eyebrow: "Contact Sales",
      title: "Talk to our sales team",
      lead: "Tell us about your operation and what you need, and our sales team will get back to you about plans and next steps.",
      switchPrompt: "Would you rather see the platform first?",
      switchLink: "Request a Demo",
      expectHeading: "What happens next",
      expect: [
        "A reply from our sales team by email",
        "Answers to your questions about plans and pricing",
        "A recommendation on the plan that fits your operation",
      ],
    },
    languagesNote: "Available in Arabic and English.",
    contact: {
      metaTitle: "Contact",
      metaDescription: "Questions about the platform, pricing or your account? Send us a message.",
      title: "Contact us",
      subtitle: "Send us a message and the right person on our team will get back to you.",
      sectionLabel: "Contact form and details",
      formHeading: "Send a message",
      infoHeading: "Other ways to reach us",
      email: "Email",
      phone: "Phone",
      address: "Address",
      demoPrompt: "Want to see the platform?",
      salesPrompt: "Questions about plans or buying?",
      faqPrompt: "Looking for a quick answer?",
      faqLink: "Read the FAQ",
      socialLabel: "Social links",
    },
  },
  ar: {
    demo: {
      metaTitle: "اطلب عرضًا توضيحيًا",
      metaDescription: `تعرّف على كيفية ربط ${brand.nameAr} بين العقود والجدولة والعمل الميداني والفوترة في عملك.`,
      eyebrow: "اطلب عرضًا توضيحيًا",
      title: `شاهد ${brand.nameAr} بما يناسب طبيعة عملك`,
      lead: "أخبرنا قليلًا عن نشاطك التجاري وسنرتّب لك جولة في المنصة تركّز على طريقة عملك.",
      switchPrompt: "لديك سؤال عن الباقات أو الشراء؟",
      switchLink: "تواصل مع المبيعات",
      expectHeading: "ما الذي تتوقعه",
      expect: ["جولة من العقد حتى تحصيل الدفعة", "وقت لأسئلتك حول الملاءمة والإعداد والباقات", "توصية بنقطة البداية المناسبة"],
    },
    sales: {
      metaTitle: "تواصل مع المبيعات",
      metaDescription: `تحدّث مع فريق مبيعات ${brand.nameAr} عن الباقات والأسعار ومدى ملاءمتها لعملك.`,
      eyebrow: "تواصل مع المبيعات",
      title: "تحدّث مع فريق المبيعات",
      lead: "أخبرنا عن عملك وما تحتاجه، وسيتواصل معك فريق المبيعات بشأن الباقات والخطوات التالية.",
      switchPrompt: "تفضّل مشاهدة المنصة أولًا؟",
      switchLink: "اطلب عرضًا توضيحيًا",
      expectHeading: "ما الذي سيحدث بعد ذلك",
      expect: ["رد من فريق المبيعات عبر البريد الإلكتروني", "إجابات عن أسئلتك حول الباقات والأسعار", "توصية بالباقة المناسبة لعملك"],
    },
    languagesNote: "متاح باللغتين العربية والإنجليزية.",
    contact: {
      metaTitle: "تواصل معنا",
      metaDescription: "لديك أسئلة عن المنصة أو الأسعار أو حسابك؟ أرسل لنا رسالة.",
      title: "تواصل معنا",
      subtitle: "أرسل لنا رسالة وسيتواصل معك الشخص المناسب من فريقنا.",
      sectionLabel: "نموذج التواصل وبيانات الاتصال",
      formHeading: "أرسل رسالة",
      infoHeading: "طرق أخرى للتواصل معنا",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      address: "العنوان",
      demoPrompt: "تودّ مشاهدة المنصة؟",
      salesPrompt: "أسئلة عن الباقات أو الشراء؟",
      faqPrompt: "تبحث عن إجابة سريعة؟",
      faqLink: "اقرأ الأسئلة الشائعة",
      socialLabel: "روابط التواصل الاجتماعي",
    },
  },
};

export function getLeadPagesContent(locale: Locale): LeadPagesContent {
  return content[locale];
}
