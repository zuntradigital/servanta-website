/**
 * Solutions page copy. Persona ids are anchor targets linked from the
 * homepage and must stay the same in every locale.
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
import {
  BellRing,
  Building2,
  CalendarClock,
  ClipboardCheck,
  FileSignature,
  GitBranch,
  LayoutDashboard,
  ReceiptText,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { ModuleKey } from "../catalog";
import type { FeatureItem } from "../types";

export type Persona = { id: string; icon: LucideIcon; title: string; summary: string; items: FeatureItem[] };

export type SolutionsContent = {
  meta: { title: string; description: string };
  intro: { title: string; subtitle: string; navLabel: string };
  personas: Persona[];
};

const en: SolutionsContent = {
  meta: {
    title: "Solutions",
    description: "How facilities management companies, multi-branch service operators and contract-based service providers use the platform.",
  },
  intro: {
    title: "Built around how your business works",
    subtitle: "The same connected platform, seen through the way different service businesses operate. Find the description closest to yours.",
    navLabel: "Solutions",
  },
  personas: [
    {
      id: "facilities-management",
      icon: Building2,
      title: "Facilities Management",
      summary: "Maintenance contracts across many sites, recurring visits, and billing that has to match what was done.",
      items: [
        { icon: FileSignature, title: "Contracts per customer and site", description: "Hold every maintenance agreement with the sites and services it covers." },
        { icon: CalendarClock, title: "Planned maintenance", description: "Schedule recurring visits from the contract and fit reactive jobs around them." },
        { icon: ReceiptText, title: "Billing that matches the work", description: "Invoice against completed visits so customers can see what they are paying for." },
      ],
    },
    {
      id: "multi-branch",
      icon: GitBranch,
      title: "Multi-Branch Service Operators",
      summary: "Several branches or teams that need to work the same way, with one view across all of them.",
      items: [
        { icon: Users, title: "Shared customer records", description: "Every branch works from the same customer and contract information." },
        { icon: Wrench, title: "Consistent field process", description: "The same work order flow in every branch, so completion means the same thing everywhere." },
        { icon: LayoutDashboard, title: "One operational view", description: "See what needs attention across branches from the Command Center." },
      ],
    },
    {
      id: "contract-based",
      icon: ClipboardCheck,
      title: "Contract-Based Service Providers",
      summary: "Businesses whose revenue is defined by agreements, where every visit and invoice belongs to a contract.",
      items: [
        { icon: FileSignature, title: "Contract as the source", description: "Terms, value and covered services define what gets scheduled and billed." },
        { icon: BellRing, title: "Renewals on time", description: "Expiring contracts surface ahead of their end date." },
        { icon: ReceiptText, title: "Traceable revenue", description: "Follow any invoice back to the work and agreement behind it." },
      ],
    },
  ],
};

const ar: SolutionsContent = {
  meta: {
    title: "الحلول",
    description: "كيف تستخدم شركات إدارة المرافق ومشغلو الخدمات متعددو الفروع ومقدمو الخدمات القائمة على العقود المنصة.",
  },
  intro: {
    title: "مبنية حول طريقة عمل شركتك",
    subtitle: "المنصة المتكاملة نفسها، من منظور الطريقة التي تعمل بها شركات الخدمات المختلفة. اختر الوصف الأقرب إلى شركتك.",
    navLabel: "الحلول",
  },
  personas: [
    {
      id: "facilities-management",
      icon: Building2,
      title: "إدارة المرافق",
      summary: "عقود صيانة تمتد عبر مواقع عديدة، وزيارات دورية، وفوترة يجب أن تطابق ما تم تنفيذه.",
      items: [
        { icon: FileSignature, title: "عقود لكل عميل وموقع", description: "احتفظ بكل اتفاقية صيانة مع المواقع والخدمات التي تشملها." },
        { icon: CalendarClock, title: "الصيانة المخططة", description: "جدول الزيارات الدورية انطلاقًا من العقد، ونسّق الأعمال الطارئة حولها." },
        { icon: ReceiptText, title: "فوترة تطابق العمل", description: "أصدر الفواتير مقابل الزيارات المكتملة ليرى العملاء ما يدفعون مقابله." },
      ],
    },
    {
      id: "multi-branch",
      icon: GitBranch,
      title: "مشغلو الخدمات متعددو الفروع",
      summary: "عدة فروع أو فرق تحتاج إلى العمل بالطريقة نفسها، مع رؤية واحدة تجمعها كلها.",
      items: [
        { icon: Users, title: "سجلات عملاء مشتركة", description: "يعمل كل فرع من معلومات العملاء والعقود نفسها." },
        { icon: Wrench, title: "عملية ميدانية موحّدة", description: "تدفق أوامر العمل نفسه في كل فرع، ليكون للإنجاز المعنى نفسه في كل مكان." },
        { icon: LayoutDashboard, title: "رؤية تشغيلية واحدة", description: "اعرف ما يحتاج إلى متابعة عبر الفروع من مركز التحكم." },
      ],
    },
    {
      id: "contract-based",
      icon: ClipboardCheck,
      title: "مقدمو الخدمات القائمة على العقود",
      summary: "شركات تحدّد الاتفاقيات إيراداتها، وتنتمي فيها كل زيارة وكل فاتورة إلى عقد.",
      items: [
        { icon: FileSignature, title: "العقد هو المرجع", description: "تحدّد الشروط والقيمة والخدمات المشمولة ما تتم جدولته وفوترته." },
        { icon: BellRing, title: "تجديدات في موعدها", description: "تظهر العقود التي تقترب من الانتهاء قبل تاريخ انتهائها." },
        { icon: ReceiptText, title: "إيرادات قابلة للتتبّع", description: "تتبّع أي فاتورة وصولًا إلى العمل والاتفاقية اللذين تستند إليهما." },
      ],
    },
  ],
};

/**
 * Module page behind each persona card, in card order (WEB-MKT-SRS-002 §54, §105:
 * solutions reuse existing modules and never introduce new features).
 */
export const personaModules: Record<string, ModuleKey[]> = {
  "facilities-management": ["contracts", "scheduling", "billing"],
  "multi-branch": ["customer-management", "work-orders", "command-center"],
  "contract-based": ["contracts", "contracts", "billing"],
};

export function getSolutionsContent(locale: Locale): SolutionsContent {
  return { en, ar }[locale];
}
