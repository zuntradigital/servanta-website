/**
 * About page copy.
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
import { Compass, Eye, Handshake, Scale, ShieldCheck, Target } from "lucide-react";
import type { FlowContent } from "@/components/visuals/FlowVisual";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/locales";
import type { FeatureItem } from "../types";

export type AboutContent = {
  meta: { title: string; description: string };
  intro: { title: string };
  story: { heading: string; paragraphs: string[]; visual: FlowContent };
  values: { heading: string; subheading: string; items: FeatureItem[] };
  cta: { heading: string };
};

// Placeholder values copy: professional and non-specific, ready to be replaced.
const en: AboutContent = {
  meta: {
    title: "About",
    description: `Why ${brand.name} exists and the principles behind how we build it.`,
  },
  intro: { title: "Built for the businesses that run on trust" },
  story: {
    heading: "Why we built it",
    paragraphs: [
      "Contract-based service businesses keep their promises in the field, but the systems behind them are often a patchwork: contracts in one place, schedules in another, invoices in a third.",
      `${brand.name} brings customers, contracts, scheduling, field execution, billing and collections into one connected platform, so every commitment can be traced from agreement to payment.`,
    ],
    visual: {
      caption: "Illustrative — the core business loop",
      description: "contract, service, work order and invoice connected in one flow",
      nodes: [
        { label: "Contract", meta: "Agreement" },
        { label: "Service", meta: "Scheduled" },
        { label: "Work Order", meta: "Completed" },
        { label: "Invoice", meta: "Collected" },
      ],
    },
  },
  values: {
    heading: "What guides us",
    subheading: "The principles behind how we build the product and work with customers.",
    items: [
      { icon: Target, title: "Built for the real work", description: "We design around how service businesses actually operate, from the contract to the field to the invoice." },
      { icon: ShieldCheck, title: "Trust by default", description: "Customer data is isolated, access is controlled, and important actions are recorded." },
      { icon: Eye, title: "Clarity over complexity", description: "A calm, clear interface that shows what matters and keeps everything else out of the way." },
      { icon: Scale, title: "Honest by design", description: "We describe what the product does today, and we are clear about what it does not." },
      { icon: Handshake, title: "Partners in adoption", description: "Onboarding and support are part of working with us, not an afterthought." },
      { icon: Compass, title: "Arabic and English, equally", description: "Both languages are first-class, including right-to-left layouts." },
    ],
  },
  cta: { heading: "See how the platform fits together" },
};

const ar: AboutContent = {
  meta: {
    title: "من نحن",
    description: `لماذا وُجدت ${brand.nameAr}، والمبادئ التي نبنيها على أساسها.`,
  },
  intro: { title: "مبنية للشركات التي تقوم أعمالها على الثقة" },
  story: {
    heading: "لماذا بنيناها",
    paragraphs: [
      "تفي شركات الخدمات القائمة على العقود بوعودها في الميدان، لكن الأنظمة التي تقف خلفها غالبًا ما تكون خليطًا متفرقًا: العقود في مكان، والجداول في مكان آخر، والفواتير في مكان ثالث.",
      `تجمع ${brand.nameAr} العملاء والعقود والجدولة والتنفيذ الميداني والفوترة والتحصيل في منصة واحدة متكاملة، بحيث يمكن تتبّع كل التزام من الاتفاق حتى السداد.`,
    ],
    visual: {
      caption: "توضيحي — الدورة الأساسية للأعمال",
      description: "العقد والخدمة وأمر العمل والفاتورة مترابطة في تدفق واحد",
      nodes: [
        { label: "العقد", meta: "الاتفاق" },
        { label: "الخدمة", meta: "مجدولة" },
        { label: "أمر العمل", meta: "مكتمل" },
        { label: "الفاتورة", meta: "محصّلة" },
      ],
    },
  },
  values: {
    heading: "ما يوجّهنا",
    subheading: "المبادئ التي نبني بها المنتج ونعمل بها مع عملائنا.",
    items: [
      { icon: Target, title: "مبنية للعمل الفعلي", description: "نصمّم وفق الطريقة التي تعمل بها شركات الخدمات فعلًا، من العقد إلى الميدان إلى الفاتورة." },
      { icon: ShieldCheck, title: "الثقة هي الأساس", description: "بيانات العملاء معزولة، والوصول مضبوط، والإجراءات المهمة مسجّلة." },
      { icon: Eye, title: "الوضوح قبل التعقيد", description: "واجهة هادئة وواضحة تُظهر ما يهم وتُبعد كل ما عداه عن طريقك." },
      { icon: Scale, title: "الصدق من حيث التصميم", description: "نصف ما يقدّمه المنتج اليوم، ونوضّح بصراحة ما لا يقدّمه." },
      { icon: Handshake, title: "شركاء في التبنّي", description: "الإعداد والدعم جزء من العمل معنا، وليسا أمرًا ثانويًا." },
      { icon: Compass, title: "العربية والإنجليزية على قدم المساواة", description: "اللغتان مدعومتان بالكامل، بما في ذلك الواجهات من اليمين إلى اليسار." },
    ],
  },
  cta: { heading: "اكتشف كيف تتكامل أجزاء المنصة" },
};

export function getAboutContent(locale: Locale): AboutContent {
  return { en, ar }[locale];
}
