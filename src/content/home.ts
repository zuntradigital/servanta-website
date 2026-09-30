import {
  Building2,
  ClipboardCheck,
  GitBranch,
  KeyRound,
  Languages,
  ScrollText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { CommandCenterContent } from "@/components/visuals/CommandCenterVisual";
import { brand } from "@/config/brand";
import { href } from "@/config/routes";
import type { Locale } from "@/i18n/locales";
import type { FaqItem, FeatureItem, LogoItem, StatItem, StepItem } from "./types";

/**
 * Homepage copy (01-VISUAL-DESIGN-MASTER-SPECIFICATION §5, mockups
 * homepage-desktop-en/-ar and homepage-mobile-en).
 * Arabic strings not present in the Arabic mockup were drafted for this
 * build and need review by a native Arabic copy editor before launch.
 */
export type HeroHighlight = { icon: LucideIcon; title: string; description: string };

export type HomeContent = {
  meta: { title?: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    /** Words of the title set in brand blue; must appear verbatim in `title`. */
    titleHighlight?: string;
    subtitle: string;
    /** Platform facts shown under the hero (all documented platform behaviour, no business claims). */
    highlights: HeroHighlight[];
    visual: CommandCenterContent;
  };
  trust: { label: string; logos: LogoItem[]; placeholderNote: string };
  story: { eyebrow: string; heading: string; paragraphs: string[] };
  /** Capability map items come from the catalog (src/content/catalog.ts). */
  capabilities: { eyebrow: string; heading: string; subheading: string };
  flow: { eyebrow: string; heading: string; subheading: string; items: StepItem[] };
  stats: { heading: string; items: StatItem[]; note: string };
  solutions: { eyebrow: string; heading: string; subheading: string; items: FeatureItem[] };
  faq: { eyebrow: string; heading: string; items: FaqItem[] };
  cta: { eyebrow: string; heading: string };
};

export function getHomeContent(locale: Locale): HomeContent {
  const solutions = href(locale, "solutions");

  if (locale === "ar") {
    return {
      meta: {
        title: "أدِر العقود والخدمات والفوترة كنظام واحد متكامل",
        description: brand.defaultDescription.ar,
      },
      hero: {
        eyebrow: "نظام تشغيل لشركات الخدمات القائمة على العقود",
        title: "أدِر العقود والخدمات والفوترة كنظام واحد متكامل",
        titleHighlight: "كنظام واحد متكامل",
        highlights: [
          { icon: ShieldCheck, title: "عزل كامل للبيانات", description: "بيانات كل شركة معزولة عن غيرها." },
          { icon: KeyRound, title: "صلاحيات حسب الدور", description: "كل مستخدم يرى ما يخصه فقط." },
          { icon: ScrollText, title: "سجل تدقيق", description: "الإجراءات المهمة مسجّلة بمن ومتى." },
          { icon: Languages, title: "عربي وإنجليزي", description: "دعم كامل للاتجاه من اليمين لليسار." },
        ],
        subtitle: `توحّد ${brand.nameAr} العملاء والعقود والجدولة والتنفيذ الميداني والفوترة والتحصيل — حتى لا يفوتك شيء.`,
        visual: {
          caption: "تصور توضيحي للمنتج — نمط مركز التحكم (ليس لقطة شاشة نهائية)",
          description: "مؤشرات العملاء والعقود وأوامر العمل والإيرادات، مع قائمة بالعناصر التي تحتاج إلى متابعة",
          title: "مركز التحكم",
          period: "هذا الشهر",
          kpis: [
            { label: "العملاء", value: "128" },
            { label: "العقود", value: "214" },
            { label: "أوامر العمل", value: "37" },
            { label: "الإيرادات", value: "1.2M", unit: "SAR" },
          ],
          attentionLabel: "يحتاج إلى متابعة",
          alerts: [
            { text: "فاتورة متأخرة — نورث ويند للمرافق", meta: "منذ 14 يومًا", severity: "danger" },
            { text: "عقد يقترب من الانتهاء", meta: "خلال 12 يومًا", severity: "warning" },
            { text: "أمر عمل بانتظار التحقق — WO-3318", meta: "اليوم", severity: "warning" },
          ],
          trend: {
            label: "المفوتر والمحصّل",
            legend: ["مفوتر", "محصّل"],
            months: ["أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر"],
            invoiced: [62, 70, 66, 78, 84, 92],
            collected: [55, 61, 63, 70, 74, 81],
          },
        },
      },
      trust: {
        label: "موثوق من شركات الخدمات",
        logos: [],
        placeholderNote: "عناصر نائبة — شعارات العملاء الفعلية ستُضاف مع أول العملاء",
      },
      story: {
        eyebrow: "كيف يترابط",
        heading: "نظام واحد، من أول عقد حتى آخر دفعة",
        paragraphs: [
          "كل خدمة تقدّمها ترتبط بعقد، وكل فاتورة ترتبط بعمل تم التحقق منه. لا مزيد من جداول البيانات لمطابقة ثلاثة أنظمة بعد وقوع الأمر.",
        ],
      },
      capabilities: {
        eyebrow: "المنصة",
        heading: "مبني لكل جزء من عملياتك",
        subheading: "قدرات متصلة، مجمّعة حسب ما تساعدك على إدارته.",
      },
      flow: {
        eyebrow: "كيف يعمل",
        heading: "من العقد إلى التحصيل، خطوة بخطوة",
        subheading: "الدورة الأساسية لأي شركة خدمات، في مكان واحد.",
        items: [
          { title: "أنشئ العقد", description: "حدّد العميل والمواقع والخدمات والشروط مرة واحدة." },
          { title: "جدول العمل", description: "خطط للزيارات الدورية والأعمال عند الطلب." },
          { title: "نفّذ في الميدان", description: "يستلم الفنيون أوامر العمل ويسجّلون إنجازها." },
          { title: "أصدر الفواتير وحصّل", description: "أصدر الفواتير مقابل العمل المنجز وتابع التحصيل." },
        ],
      },
      stats: {
        heading: "لمحة عن المنصة",
        items: [
          { value: "AR/EN", label: "ثنائية اللغة بالكامل، تدعم الاتجاه من اليمين لليسار" },
        ],
        note: "قيم توضيحية — الإحصاءات الفعلية المقاسة ستُضاف بعد التشغيل الفعلي",
      },
      solutions: {
        eyebrow: "الحلول",
        heading: "مصمم لطريقة عمل شركات الخدمات",
        subheading: "القدرات نفسها، مؤطرة حسب طبيعة عملك.",
        items: [
          { icon: Building2, title: "إدارة المرافق", description: "اجمع عقود الصيانة الدورية وزيارات المواقع والفوترة في مكان واحد.", href: `${solutions}#facilities-management` },
          { icon: GitBranch, title: "مشغلو الخدمات متعددو الفروع", description: "شغّل كل فرع وفق العملية نفسها، مع رؤية واحدة تجمعها.", href: `${solutions}#multi-branch` },
          { icon: ClipboardCheck, title: "مقدمو الخدمات القائمة على العقود", description: "اربط كل زيارة وكل فاتورة بالاتفاقية التي تنتمي إليها.", href: `${solutions}#contract-based` },
        ],
      },
      faq: {
        eyebrow: "الأسئلة الشائعة",
        heading: "أسئلة شائعة",
        items: [
          {
            question: `هل ${brand.nameAr} متعددة المستأجرين وآمنة من حيث التصميم؟`,
            answer: "نعم. المنصة مبنية بنموذج متعدد المستأجرين تُعزل فيه بيانات كل شركة عن غيرها، ويخضع الوصول لصلاحيات الأدوار، وتُسجّل الإجراءات المهمة في سجل تدقيق.",
          },
          {
            question: "هل يمكنني إدارة الخدمات الدورية والخدمات لمرة واحدة معًا؟",
            answer: "نعم. تدعم الجدولة الخدمات الدورية القائمة على العقود والأعمال لمرة واحدة عند الطلب ضمن العرض التشغيلي نفسه.",
          },
          {
            question: "هل تتناسب الأسعار مع حجم فريقي؟",
            answer: "تختلف الباقات في القدرات وعدد المستخدمين المشمولين، لتبدأ بما تحتاجه وتتوسع مع نموك. اطّلع على صفحة الأسعار أو تحدّث مع فريقنا.",
          },
          {
            question: "هل المنصة متاحة باللغة العربية؟",
            answer: "نعم. المنصة ثنائية اللغة بالكامل بالعربية والإنجليزية، مع واجهات من اليمين إلى اليسار للعربية.",
          },
        ],
      },
      cta: { eyebrow: "الخطوة التالية", heading: `هل أنت مستعد لتجربة ${brand.nameAr}؟` },
    };
  }

  return {
    meta: {
      title: "Run contracts, service, and billing as one connected system",
      description: brand.defaultDescription.en,
    },
    hero: {
      eyebrow: "Operating System for Service Businesses",
      title: "Run contracts, service, and billing as one connected system.",
      titleHighlight: "as one connected system",
      highlights: [
        { icon: ShieldCheck, title: "Tenant isolation", description: "Each company's data is kept separate." },
        { icon: KeyRound, title: "Role-based access", description: "People see only what their role allows." },
        { icon: ScrollText, title: "Audit trail", description: "Key actions recorded with who and when." },
        { icon: Languages, title: "Arabic & English", description: "Full right-to-left support built in." },
      ],
      subtitle: `${brand.name} unifies customers, contracts, scheduling, field execution, billing, and collections — so nothing falls through the cracks.`,
      visual: {
        caption: "Illustrative product visualization — Command Center pattern (not a finished screenshot)",
        description: "customer, contract, work order and revenue indicators with a list of items that need attention",
        title: "Command Center",
        period: "This month",
        kpis: [
          { label: "Customers", value: "128" },
          { label: "Contracts", value: "214" },
          { label: "Work Orders", value: "37" },
          { label: "Revenue", value: "1.2M", unit: "SAR" },
        ],
        attentionLabel: "Attention required",
        alerts: [
          { text: "Overdue Invoice — Northwind Facilities", meta: "14 days", severity: "danger" },
          { text: "Contract Expiring — 12 days", meta: "Renewal", severity: "warning" },
          { text: "Work Order Awaiting Verification — WO-3318", meta: "Today", severity: "warning" },
        ],
        trend: {
          label: "Invoiced vs collected",
          legend: ["Invoiced", "Collected"],
          months: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          invoiced: [62, 70, 66, 78, 84, 92],
          collected: [55, 61, 63, 70, 74, 81],
        },
      },
    },
    trust: {
      label: "Trusted by service businesses",
      logos: [],
      placeholderNote: "Placeholder — real customer logos will appear here once available",
    },
    story: {
      eyebrow: "How it connects",
      heading: "One system, from first contract to final payment",
      paragraphs: [
        "Every service you deliver traces back to a contract, and every invoice traces back to verified work. No spreadsheets reconciling three systems after the fact.",
      ],
    },
    capabilities: {
      eyebrow: "Platform",
      heading: "Built for every part of your operation",
      subheading: "Connected capabilities, grouped by what they help you run.",
    },
    flow: {
      eyebrow: "How it works",
      heading: "From contract to collection, step by step",
      subheading: "The core loop of a service business, in one place.",
      items: [
        { title: "Set up your contract", description: "Define the customer, sites, services, and terms once." },
        { title: "Schedule the work", description: "Plan recurring visits and on-demand jobs." },
        { title: "Execute in the field", description: "Technicians receive work orders and record completion." },
        { title: "Bill and collect", description: "Invoice against completed work and follow up on payment." },
      ],
    },
    stats: {
      heading: "The platform at a glance",
      items: [
        { value: "AR/EN", label: "Fully Bilingual, RTL-Ready" },
      ],
      note: "Illustrative example values — measured statistics will replace these once available",
    },
    solutions: {
      eyebrow: "Solutions",
      heading: "Designed around how service businesses work",
      subheading: "The same capabilities, framed around your operation.",
      items: [
        { icon: Building2, title: "Facilities Management", description: "Keep recurring maintenance contracts, site visits, and billing in one place.", href: `${solutions}#facilities-management` },
        { icon: GitBranch, title: "Multi-Branch Service Operators", description: "Run every branch on the same process, with one view across all of them.", href: `${solutions}#multi-branch` },
        { icon: ClipboardCheck, title: "Contract-Based Service Providers", description: "Tie every visit and every invoice back to the agreement it belongs to.", href: `${solutions}#contract-based` },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Common questions",
      items: [
        {
          question: `Is ${brand.name} multi-tenant and secure by design?`,
          answer: "Yes. The platform is built as a multi-tenant system in which each company's data is isolated from every other company's. Access is controlled by role, and key actions are recorded in an audit log.",
        },
        {
          question: "Can I manage recurring and one-time services together?",
          answer: `Yes — ${brand.name}'s scheduling engine supports both recurring contract-based services and one-off on-demand work within the same operational view.`,
        },
        {
          question: "Does pricing scale with my team?",
          answer: "Plans differ in the capabilities and number of users they include, so you can start with what you need and move up as you grow. See Pricing for current plans, or talk to our team about your operation.",
        },
        {
          question: "Is the platform available in Arabic?",
          answer: "Yes. The platform is fully bilingual in Arabic and English, with right-to-left layouts for Arabic.",
        },
      ],
    },
    cta: { eyebrow: "Next step", heading: `Ready to see ${brand.name} in action?` },
  };
}
