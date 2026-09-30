import { Building2, FileLock, KeyRound, Lock, LogIn, Network, ScrollText } from "lucide-react";
import type { Locale } from "@/i18n/locales";
import type { FeatureItem } from "../types";

/**
 * Security & Trust page (WEB-MKT-SRS-002 §70). Every statement traces to a
 * documented control in SRS-SERVANTA-MASTER-001 (§8.1–8.4, §11, §18–19, §32,
 * NFR-SEC-001–003). Per §71 no certification, uptime or "grade" claim is made.
 * Not covered until approved: API security (the API is unpublished), retention /
 * deletion periods (pending legal review) and security-testing results.
 * Card ids are anchor targets used by the capability map.
 *
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
export type SecurityContent = {
  meta: { title: string; description: string };
  intro: { eyebrow: string; title: string; subtitle: string };
  overview: { heading: string; paragraphs: string[] };
  controls: { heading: string; subheading: string; items: FeatureItem[] };
  scope: { heading: string; body: string };
};

const en: SecurityContent = {
  meta: {
    title: "Security & Trust",
    description: "How the platform separates tenants, controls access, records sensitive changes and protects data and files.",
  },
  intro: {
    eyebrow: "Security & Trust",
    title: "How the platform protects your data",
    subtitle: "Tenant isolation, role-based access and an audit layer are part of how every module works, not add-ons.",
  },
  overview: {
    heading: "Separate by tenant, controlled by role",
    paragraphs: [
      "Each company works in its own tenant. Inside it, every module uses the same access rules, and sensitive changes are recorded in the audit layer.",
    ],
  },
  controls: {
    heading: "Security controls",
    subheading: "The documented controls behind the platform.",
    items: [
      {
        id: "tenant-isolation",
        icon: Building2,
        title: "Tenant isolation",
        description:
          "Every record belongs to one tenant. The tenant is taken from the signed-in session, never from the request, and a record from another tenant is treated as not found.",
      },
      {
        id: "access-control",
        icon: KeyRound,
        title: "Roles and permissions",
        description:
          "Access is granted through roles and checked by the platform on every request, not only hidden in the interface. Nobody can grant a permission they don't hold themselves.",
      },
      {
        id: "organizations",
        icon: Network,
        title: "Organizations and branches",
        description: "Inside a tenant, the organization is structured into branches, departments and teams, and users can be given access to specific branches.",
      },
      {
        id: "authentication",
        icon: LogIn,
        title: "Sign-in and sessions",
        description:
          "Email and password sign-in for verified email addresses. Sign-in attempts are rate-limited, password reset links are single-use and time-limited, and a password reset ends every existing session.",
      },
      {
        id: "audit",
        icon: ScrollText,
        title: "Audit layer",
        description:
          "The system provides an audit layer for sensitive events and changes, within the scope of each tenant and the viewer's permissions. Audit records can't be edited or deleted.",
      },
      {
        id: "data-protection",
        icon: Lock,
        title: "Data protection",
        description:
          "Traffic is encrypted in transit with TLS 1.2 or later, and sensitive fields are encrypted at rest. Passwords are stored with a modern adaptive hash, never with reversible encryption.",
      },
      {
        id: "files",
        icon: FileLock,
        title: "File security",
        description: "Files are private by default and are downloaded through short-lived signed links, issued only after the tenant and permission checks pass.",
      },
    ],
  },
  scope: {
    heading: "What this page covers",
    body: "This page describes the platform's documented controls. Details on data retention, security testing and API access will be added here once they are approved for publication.",
  },
};

const ar: SecurityContent = {
  meta: {
    title: "الأمان والثقة",
    description: "كيف تفصل المنصة بين المستأجرين، وتتحكم في الوصول، وتسجّل التغييرات الحساسة، وتحمي البيانات والملفات.",
  },
  intro: {
    eyebrow: "الأمان والثقة",
    title: "كيف تحمي المنصة بياناتك",
    subtitle: "العزل بين المستأجرين والصلاحيات حسب الأدوار وطبقة التدقيق جزء من طريقة عمل كل وحدة، وليست إضافات.",
  },
  overview: {
    heading: "منفصلة لكل مستأجر، ومضبوطة حسب الدور",
    paragraphs: ["تعمل كل شركة ضمن مستأجر خاص بها. وداخله، تستخدم جميع الوحدات قواعد الوصول نفسها، وتُسجَّل التغييرات الحساسة في طبقة التدقيق."],
  },
  controls: {
    heading: "ضوابط الأمان",
    subheading: "الضوابط الموثقة التي تقوم عليها المنصة.",
    items: [
      {
        id: "tenant-isolation",
        icon: Building2,
        title: "العزل بين المستأجرين",
        description: "ينتمي كل سجل إلى مستأجر واحد. ويُحدَّد المستأجر من جلسة الدخول لا من الطلب، ويُعامل أي سجل من مستأجر آخر كأنه غير موجود.",
      },
      {
        id: "access-control",
        icon: KeyRound,
        title: "الأدوار والصلاحيات",
        description: "يُمنح الوصول عبر الأدوار وتتحقق منه المنصة في كل طلب، ولا يقتصر على إخفائه في الواجهة. ولا يمكن لأحد منح صلاحية لا يملكها بنفسه.",
      },
      {
        id: "organizations",
        icon: Network,
        title: "المنظمات والفروع",
        description: "داخل المستأجر، تُنظَّم المنشأة في فروع وأقسام وفرق، ويمكن منح المستخدمين الوصول إلى فروع محددة.",
      },
      {
        id: "authentication",
        icon: LogIn,
        title: "تسجيل الدخول والجلسات",
        description: "تسجيل الدخول بالبريد الإلكتروني وكلمة المرور للعناوين المتحقق منها. وتخضع محاولات الدخول لحد معدل، وروابط إعادة تعيين كلمة المرور صالحة لمرة واحدة ولمدة محدودة، وإعادة التعيين تُنهي جميع الجلسات القائمة.",
      },
      {
        id: "audit",
        icon: ScrollText,
        title: "طبقة التدقيق",
        description: "يوفر النظام طبقة تدقيق للأحداث والتغييرات الحساسة وفق نطاقات النظام والصلاحيات، ولا يمكن تعديل سجلات التدقيق أو حذفها.",
      },
      {
        id: "data-protection",
        icon: Lock,
        title: "حماية البيانات",
        description: "تُشفَّر البيانات أثناء النقل باستخدام TLS 1.2 أو أحدث، وتُشفَّر الحقول الحساسة عند التخزين. وتُحفظ كلمات المرور بخوارزمية تجزئة تكيفية حديثة، ولا تُشفَّر تشفيرًا قابلًا للعكس أبدًا.",
      },
      {
        id: "files",
        icon: FileLock,
        title: "أمان الملفات",
        description: "الملفات خاصة افتراضيًا، وتُنزَّل عبر روابط موقّعة قصيرة الأجل لا تصدر إلا بعد اجتياز فحوص المستأجر والصلاحيات.",
      },
    ],
  },
  scope: {
    heading: "ما تغطيه هذه الصفحة",
    body: "تصف هذه الصفحة الضوابط الموثقة للمنصة. وستُضاف تفاصيل الاحتفاظ بالبيانات واختبارات الأمان والوصول عبر واجهة البرمجة هنا بعد اعتماد نشرها.",
  },
};

export function getSecurityContent(locale: Locale): SecurityContent {
  return { en, ar }[locale];
}
