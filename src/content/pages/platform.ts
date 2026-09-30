/**
 * Platform page copy.
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
import { Building, Layers, Languages, Lock, ScrollText, ShieldCheck } from "lucide-react";
import type { ComparisonValue } from "@/components/sections/ComparisonTable";
import { brand } from "@/config/brand";
import type { Locale } from "@/i18n/locales";
import type { FeatureItem } from "../types";

export type PlatformContent = {
  meta: { title: string; description: string };
  intro: { eyebrow: string; title: string; subtitle: string };
  architecture: { heading: string; paragraphs: string[] };
  pillars: { heading: string; subheading: string; items: FeatureItem[] };
  compare: {
    heading: string;
    subheading: string;
    caption: string;
    firstColumnLabel: string;
    columns: string[];
    rows: Array<{ feature: string; values: ComparisonValue[] }>;
    labels: { included: string; notIncluded: string };
  };
};

const en: PlatformContent = {
  meta: {
    title: "Platform",
    description: "A multi-tenant, modular platform with tenant isolation, role-based access and audit logging built in.",
  },
  intro: {
    eyebrow: "Platform",
    title: "One secure platform for the whole operation",
    subtitle: `${brand.name} is a single multi-tenant platform: every module shares the same records, the same access rules and the same audit trail.`,
  },
  architecture: {
    heading: "Isolated by tenant, connected by design",
    paragraphs: [
      "Each company operates in its own tenant, with its data separated from every other tenant's. Inside a tenant, every module works from the same customers, contracts and work records.",
      "Access is granted by role, and important actions are logged, giving IT and security teams a clear picture of who can do what.",
    ],
  },
  pillars: {
    heading: "Built for teams that need to trust their system",
    subheading: "The foundations technical and security reviewers ask about first.",
    items: [
      { icon: Building, title: "Multi-Tenant by Design", description: "Every company works in its own tenant, with its data kept separate from every other company's." },
      { icon: ShieldCheck, title: "Role-Based Access Control", description: "Roles decide who can see and change what, enforced by the platform rather than the interface." },
      { icon: Layers, title: "Modular Architecture", description: "Each business area is its own module with clear boundaries, sharing one set of core records." },
      { icon: ScrollText, title: "Auditable", description: "Key actions are recorded in an audit log, so changes can be traced to who made them and when." },
      { icon: Lock, title: "Data Integrity", description: "Invoices, work orders and contracts reference each other, so records stay consistent as work moves through the system." },
      { icon: Languages, title: "Bilingual by Default", description: "Arabic and English throughout, with right-to-left layouts for Arabic." },
    ],
  },
  compare: {
    heading: "Compared with spreadsheets and separate tools",
    subheading: "What changes when the whole operation runs on one connected system.",
    caption: "Platform compared with spreadsheets and separate tools",
    firstColumnLabel: "Capability",
    columns: [brand.name, "Spreadsheets", "Separate tools"],
    rows: [
      { feature: "One customer record shared by every team", values: [true, false, false] },
      { feature: "Scheduled work linked to its contract", values: [true, "Manual", "Manual"] },
      { feature: "Invoices built from completed work orders", values: [true, "Manual", "Via integration"] },
      { feature: "Role-based access to records", values: [true, false, "Per tool"] },
      { feature: "Audit log of key actions", values: [true, false, "Per tool"] },
      { feature: "One view of what needs attention", values: [true, false, false] },
    ],
    labels: { included: "Yes", notIncluded: "No" },
  },
};

const ar: PlatformContent = {
  meta: {
    title: "المنصة",
    description: "منصة معيارية متعددة المستأجرين، مع عزل المستأجرين والتحكم في الوصول حسب الأدوار وسجل التدقيق بشكل مدمج.",
  },
  intro: {
    eyebrow: "المنصة",
    title: "منصة واحدة آمنة لكامل عملياتك",
    subtitle: `${brand.nameAr} منصة واحدة متعددة المستأجرين: تتشارك جميع الوحدات السجلات نفسها وقواعد الوصول نفسها وسجل التدقيق نفسه.`,
  },
  architecture: {
    heading: "معزولة لكل مستأجر، ومترابطة من حيث التصميم",
    paragraphs: [
      "تعمل كل شركة ضمن مستأجر خاص بها، وبياناتها منفصلة عن بيانات كل مستأجر آخر. وداخل المستأجر، تعمل جميع الوحدات من سجلات العملاء والعقود والأعمال نفسها.",
      "يُمنح الوصول حسب الدور، وتُسجَّل الإجراءات المهمة، مما يمنح فرق تقنية المعلومات والأمن صورة واضحة عمّن يستطيع فعل ماذا.",
    ],
  },
  pillars: {
    heading: "مبنية للفرق التي تحتاج إلى الثقة بنظامها",
    subheading: "الأسس التي يسأل عنها المراجعون التقنيون ومراجعو الأمن أولًا.",
    items: [
      { icon: Building, title: "متعددة المستأجرين من حيث التصميم", description: "تعمل كل شركة ضمن مستأجر خاص بها، وتبقى بياناتها منفصلة عن بيانات كل شركة أخرى." },
      { icon: ShieldCheck, title: "التحكم في الوصول حسب الأدوار", description: "تحدّد الأدوار من يمكنه الاطلاع على ماذا وتعديله، وتفرضها المنصة نفسها لا الواجهة." },
      { icon: Layers, title: "بنية معيارية", description: "كل مجال من مجالات العمل وحدة مستقلة بحدود واضحة، وتتشارك جميعها مجموعة واحدة من السجلات الأساسية." },
      { icon: ScrollText, title: "قابلة للتدقيق", description: "تُسجَّل الإجراءات الرئيسية في سجل التدقيق، بحيث يمكن تتبّع كل تغيير إلى من أجراه ومتى." },
      { icon: Lock, title: "سلامة البيانات", description: "ترتبط الفواتير وأوامر العمل والعقود ببعضها، فتبقى السجلات متسقة مع انتقال العمل عبر النظام." },
      { icon: Languages, title: "ثنائية اللغة افتراضيًا", description: "العربية والإنجليزية في كل مكان، مع واجهات من اليمين إلى اليسار للعربية." },
    ],
  },
  compare: {
    heading: "مقارنة بجداول البيانات والأدوات المنفصلة",
    subheading: "ما الذي يتغيّر عندما تعمل العمليات كلها على نظام واحد متكامل.",
    caption: "المنصة مقارنة بجداول البيانات والأدوات المنفصلة",
    firstColumnLabel: "القدرة",
    columns: [brand.nameAr, "جداول البيانات", "أدوات منفصلة"],
    rows: [
      { feature: "سجل عميل واحد تتشاركه جميع الفرق", values: [true, false, false] },
      { feature: "أعمال مجدولة مرتبطة بعقدها", values: [true, "يدويًا", "يدويًا"] },
      { feature: "فواتير تُنشأ من أوامر العمل المكتملة", values: [true, "يدويًا", "عبر التكامل"] },
      { feature: "وصول إلى السجلات حسب الأدوار", values: [true, false, "لكل أداة على حدة"] },
      { feature: "سجل تدقيق للإجراءات الرئيسية", values: [true, false, "لكل أداة على حدة"] },
      { feature: "عرض واحد لما يحتاج إلى متابعة", values: [true, false, false] },
    ],
    labels: { included: "نعم", notIncluded: "لا" },
  },
};

export function getPlatformContent(locale: Locale): PlatformContent {
  return { en, ar }[locale];
}
