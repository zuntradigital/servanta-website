/**
 * Services page copy (vendor-relationship services, not the product's own
 * service module).
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
import { GraduationCap, LifeBuoy, Rocket } from "lucide-react";
import { salesHref } from "@/config/routes";
import type { Locale } from "@/i18n/locales";
import type { FeatureItem, StepItem } from "../types";

export type ServicesContent = {
  meta: { title: string; description: string };
  intro: { eyebrow: string; title: string; subtitle: string };
  services: { heading: string; subheading: string; items: FeatureItem[] };
  engagement: { heading: string; subheading: string; items: StepItem[] };
  cta: { heading: string };
};

export function getServicesContent(locale: Locale): ServicesContent {
  const contact = salesHref(locale);

  const en: ServicesContent = {
    meta: {
      title: "Services",
      description: "Onboarding, implementation support and ongoing success: how we work with you around the platform.",
    },
    intro: {
      eyebrow: "Working with us",
      title: "Services around the platform",
      subtitle: "This page is about how we work with you: getting started, rolling out, and continuing to improve. For the product's own service and scheduling features, see Features.",
    },
    services: {
      heading: "How we help",
      subheading: "Support at each stage, from first setup to everyday use.",
      items: [
        { icon: Rocket, title: "Onboarding", description: "We set up your account, bring in your customers and contracts, and configure the platform around your operation.", href: `${contact}` },
        { icon: GraduationCap, title: "Implementation Support", description: "Guidance for your office and field teams as they move their day-to-day work onto the platform.", href: `${contact}` },
        { icon: LifeBuoy, title: "Ongoing Success", description: "A team to help with questions, changes in how you work, and getting more from the platform over time.", href: `${contact}` },
      ],
    },
    engagement: {
      heading: "How an engagement works",
      subheading: "A clear path from first conversation to running on the platform.",
      items: [
        { title: "Discovery", description: "We learn how your contracts, teams and billing work today." },
        { title: "Setup", description: "We configure the platform and bring your existing records in." },
        { title: "Rollout", description: "Office and field teams start working on the platform, with support." },
        { title: "Ongoing success", description: "We stay involved as your operation changes and grows." },
      ],
    },
    cta: { heading: "Talk to us about your rollout" },
  };

  const ar: ServicesContent = {
    meta: {
      title: "الخدمات",
      description: "الإعداد ودعم التطبيق والنجاح المستمر: كيف نعمل معك حول المنصة.",
    },
    intro: {
      eyebrow: "العمل معنا",
      title: "خدمات حول المنصة",
      subtitle: "تتناول هذه الصفحة طريقة عملنا معك: البدء، ثم الإطلاق، ثم التحسين المستمر. أما مزايا الخدمات والجدولة داخل المنتج نفسه، فراجع صفحة المزايا.",
    },
    services: {
      heading: "كيف نساعدك",
      subheading: "دعم في كل مرحلة، من الإعداد الأول حتى الاستخدام اليومي.",
      items: [
        { icon: Rocket, title: "الإعداد", description: "نُعدّ حسابك، وننقل عملاءك وعقودك، ونهيّئ المنصة بما يناسب عملياتك.", href: `${contact}` },
        { icon: GraduationCap, title: "دعم التطبيق", description: "إرشاد لفرقك المكتبية والميدانية أثناء نقل أعمالها اليومية إلى المنصة.", href: `${contact}` },
        { icon: LifeBuoy, title: "النجاح المستمر", description: "فريق يساعدك في الإجابة عن الأسئلة، ومواكبة التغييرات في طريقة عملك، والاستفادة أكثر من المنصة مع الوقت.", href: `${contact}` },
      ],
    },
    engagement: {
      heading: "كيف يسير التعاون",
      subheading: "مسار واضح من المحادثة الأولى حتى العمل على المنصة.",
      items: [
        { title: "الاستكشاف", description: "نتعرّف على طريقة عمل عقودك وفرقك وفوترتك اليوم." },
        { title: "الإعداد", description: "نهيّئ المنصة وننقل سجلاتك الحالية إليها." },
        { title: "الإطلاق", description: "تبدأ الفرق المكتبية والميدانية العمل على المنصة، مع الدعم." },
        { title: "النجاح المستمر", description: "نبقى إلى جانبك مع تغيّر عملياتك ونموها." },
      ],
    },
    cta: { heading: "تحدّث معنا عن إطلاق المنصة لديك" },
  };

  return { en, ar }[locale];
}
