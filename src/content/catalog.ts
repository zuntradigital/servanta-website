import {
  BarChart3,
  Bell,
  CalendarClock,
  CreditCard,
  FileSignature,
  LineChart,
  ReceiptText,
  ScrollText,
  Search,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { RouteKey } from "@/config/routes";
import type { Locale } from "@/i18n/locales";

/**
 * Product capability catalog: the website's single record of what the
 * platform offers and whether each item may be published
 * (WEB-MKT-SRS-002 §5 capability matrix, §6/§107 status model, §55 module
 * records, §96 "no capability left unmapped").
 *
 * The website is not the product source of truth (§1.2). Every record names
 * its source. Statuses come from:
 *  - SRS-SERVANTA-MASTER-001 v1.0 (MVP scope, DEC-004; later phases/tranches),
 *  - the pricing entitlements in src/content/pricing.ts (SRS-PRICING-PLANS-3-TIER),
 *    whose "at launch" items are COMING_SOON here.
 * Statuses have NOT yet been verified by the Product Owner against the running
 * platform (see docs/srs-v2/02_PRODUCT_CAPABILITY_MATRIX.md). Only AVAILABLE and
 * COMING_SOON items are ever rendered; everything else stays internal.
 *
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */

export type CapabilityStatus = "AVAILABLE" | "COMING_SOON" | "ROADMAP" | "INTERNAL" | "NOT_PUBLISHED" | "DECISION_REQUIRED";

/** Statuses that may appear on the public website (§6.1, §6.2). */
export const publicStatuses: readonly CapabilityStatus[] = ["AVAILABLE", "COMING_SOON"];

export function isPublished(status: CapabilityStatus): boolean {
  return publicStatuses.includes(status);
}

export const statusLabels: Record<Locale, Record<"AVAILABLE" | "COMING_SOON", string>> = {
  en: { AVAILABLE: "Available", COMING_SOON: "Coming soon" },
  ar: { AVAILABLE: "متاح", COMING_SOON: "قريبًا" },
};

type Bi<T> = Record<Locale, T>;

const MASTER = "SRS-SERVANTA-MASTER-001 v1.0";
const PRICING = "SRS-PRICING-PLANS-3-TIER v1.0 (src/content/pricing.ts)";

/* ------------------------------------------------------------------ */
/* Modules (§55)                                                        */
/* ------------------------------------------------------------------ */

export const moduleKeys = [
  "customer-management",
  "contracts",
  "scheduling",
  "work-orders",
  "billing",
  "payments",
  "collections",
  "command-center",
  "reporting",
  "notifications",
  "audit-logs",
  "search",
] as const;

export type ModuleKey = (typeof moduleKeys)[number];

/** Map groups used by the homepage capability map (§11). */
export type CapabilityGroup = "customer" | "contracts" | "operations" | "finance" | "visibility" | "governance";

export const groupOrder: CapabilityGroup[] = ["customer", "contracts", "operations", "finance", "visibility", "governance"];

export const groupLabels: Record<Locale, Record<CapabilityGroup, string>> = {
  en: {
    customer: "Customer & CRM",
    contracts: "Contracts & Documents",
    operations: "Operations",
    finance: "Finance",
    visibility: "Visibility",
    governance: "Governance",
  },
  ar: {
    customer: "العملاء وعلاقات العملاء",
    contracts: "العقود والمستندات",
    operations: "العمليات",
    finance: "المالية",
    visibility: "الرؤية والمتابعة",
    governance: "الحوكمة",
  },
};

/** Illustrative product visuals available for module pages (components/visuals/UiCrops.tsx). */
export type VisualKey =
  | "customer"
  | "contract"
  | "schedule"
  | "workOrder"
  | "invoice"
  | "payment"
  | "collections"
  | "commandCenter"
  | "report"
  | "notifications"
  | "audit"
  | "search"
  | "service"
  | "evidence"
  | "verification";

type ModuleCopy = {
  name: string;
  short: string;
  /** Value proposition (§103.2). */
  value: string;
  /** Main capabilities: each line traces to the module's source reference. */
  capabilities: string[];
  seoTitle: string;
  seoDescription: string;
};

export type ModuleRecord = {
  key: ModuleKey;
  icon: LucideIcon;
  category: CapabilityGroup;
  status: CapabilityStatus;
  sourceReference: string;
  visual: VisualKey;
  relatedModules: ModuleKey[];
  /** Documented lifecycle states (§103.4), in order. */
  workflow?: Bi<string[]>;
  /** English FAQ questions (content/pages/faq.ts) relevant to the module. */
  faqQuestions?: string[];
  copy: Bi<ModuleCopy>;
};

const modules: ModuleRecord[] = [
  {
    key: "customer-management",
    icon: Users,
    category: "customer",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.5 FR-CUST-001–008, BR-CUST-001–003`,
    visual: "customer",
    relatedModules: ["contracts", "work-orders", "billing"],
    copy: {
      en: {
        name: "Customer Management",
        short: "One record per client with contacts, sites and history, shared by every other module.",
        value:
          "Every contract, work order and invoice starts from the customer. Keep one customer record that every other module works from, instead of copies in separate spreadsheets.",
        capabilities: [
          "Customer records with company details and customer type",
          "Contacts and customer sites (branches and addresses) under each customer",
          "Customer 360: contracts, work orders, invoices, documents and timeline in one view",
          "Financial details in Customer 360 shown only to users with financial access",
          "A customer can't be removed while it still has an active contract",
        ],
        seoTitle: "Customer Management",
        seoDescription: "One customer record with contacts, sites and a Customer 360 view of contracts, work orders, invoices and documents.",
      },
      ar: {
        name: "إدارة العملاء",
        short: "سجل واحد لكل عميل يضم جهات الاتصال والمواقع والسجل التاريخي، وتشترك فيه جميع الوحدات الأخرى.",
        value: "يبدأ كل عقد وأمر عمل وفاتورة من العميل. احتفظ بسجل واحد للعميل تعمل منه جميع الوحدات، بدلًا من نسخ متفرقة في جداول بيانات منفصلة.",
        capabilities: [
          "سجلات العملاء مع بيانات الشركة ونوع العميل",
          "جهات الاتصال ومواقع العميل (الفروع والعناوين) ضمن كل عميل",
          "عرض العميل 360: العقود وأوامر العمل والفواتير والمستندات والسجل الزمني في مكان واحد",
          "البيانات المالية في عرض العميل 360 تظهر فقط لمن يملك صلاحية الاطلاع المالي",
          "لا يمكن حذف عميل ما دام لديه عقد نشط",
        ],
        seoTitle: "إدارة العملاء",
        seoDescription: "سجل عميل واحد يضم جهات الاتصال والمواقع وعرض العميل 360 للعقود وأوامر العمل والفواتير والمستندات.",
      },
    },
  },
  {
    key: "contracts",
    icon: FileSignature,
    category: "contracts",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.6 FR-CONTRACT-001–008, BR-CONTRACT-001–004, §38 state machine`,
    visual: "contract",
    relatedModules: ["scheduling", "billing", "customer-management"],
    workflow: {
      en: ["Draft", "Review", "Approval", "Active", "Renewal due", "Renewed, expired or terminated"],
      ar: ["مسودة", "مراجعة", "اعتماد", "نشط", "مستحق التجديد", "مُجدَّد أو منتهٍ أو مُنهى"],
    },
    copy: {
      en: {
        name: "Contract Management",
        short: "Contract value, terms, covered services and renewal dates, tracked in one place.",
        value:
          "Capture the terms once and let them drive what happens next: which services are due, how they are billed, and when the contract needs renewing.",
        capabilities: [
          "Contracts with customer, type, start and end dates, value, billing cycle and line items",
          "Review and approval before a contract becomes active",
          "Renewal alerts ahead of the end date, with renewals recorded on the contract",
          "Terminating a contract cancels its future work orders that haven't started",
          "Services and invoices always trace back to their contract",
        ],
        seoTitle: "Contract Management",
        seoDescription: "Contracts with value, term, billing cycle and covered services, from draft and approval to renewal.",
      },
      ar: {
        name: "إدارة العقود",
        short: "قيمة العقد وشروطه والخدمات المشمولة ومواعيد التجديد، متتبَّعة في مكان واحد.",
        value: "سجّل الشروط مرة واحدة ودعها توجّه ما يليها: الخدمات المستحقة، وطريقة فوترتها، وموعد تجديد العقد.",
        capabilities: [
          "عقود تتضمن العميل والنوع وتاريخي البداية والنهاية والقيمة ودورة الفوترة والبنود",
          "مراجعة واعتماد قبل أن يصبح العقد نشطًا",
          "تنبيهات التجديد قبل تاريخ الانتهاء، مع تسجيل التجديد على العقد",
          "إنهاء العقد يلغي أوامر العمل المستقبلية التي لم تبدأ",
          "ترتبط الخدمات والفواتير دائمًا بعقدها",
        ],
        seoTitle: "إدارة العقود",
        seoDescription: "عقود بقيمتها ومدتها ودورة فوترتها والخدمات المشمولة، من المسودة والاعتماد حتى التجديد.",
      },
    },
  },
  {
    key: "scheduling",
    icon: CalendarClock,
    category: "operations",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.7 FR-SERVICE-001–004, §8.8 FR-SCHED-001–006`,
    visual: "schedule",
    relatedModules: ["contracts", "work-orders", "command-center"],
    faqQuestions: ["Can I manage recurring and one-time services together?"],
    copy: {
      en: {
        name: "Services & Scheduling",
        short: "Recurring contract visits and on-demand jobs planned in the same schedule.",
        value:
          "Define each service once under its contract and let the schedule follow from it, with on-demand work planned alongside recurring visits.",
        capabilities: [
          "Services defined under an active contract: type, frequency, duration, location, resources and instructions",
          "Visits generated on a rolling schedule from each service's frequency",
          "Reschedule or cancel a single visit without changing the service",
          "Overlapping work for the same team is flagged for review",
          "On-demand jobs added to the same schedule",
        ],
        seoTitle: "Services & Scheduling",
        seoDescription: "Services defined under contracts and scheduled on a rolling basis, with on-demand work in the same schedule.",
      },
      ar: {
        name: "الخدمات والجدولة",
        short: "الزيارات التعاقدية الدورية والأعمال عند الطلب مخطَّطة في الجدول نفسه.",
        value: "عرّف كل خدمة مرة واحدة ضمن عقدها ودع الجدول ينبثق منها، مع تخطيط الأعمال عند الطلب إلى جانب الزيارات الدورية.",
        capabilities: [
          "خدمات معرّفة ضمن عقد نشط: النوع والتكرار والمدة والموقع والموارد والتعليمات",
          "زيارات تُولَّد على جدول متجدد وفق تكرار كل خدمة",
          "إعادة جدولة زيارة واحدة أو إلغاؤها دون تغيير الخدمة",
          "الإشارة إلى الأعمال المتداخلة للفريق نفسه لمراجعتها",
          "إضافة الأعمال عند الطلب إلى الجدول نفسه",
        ],
        seoTitle: "الخدمات والجدولة",
        seoDescription: "خدمات معرّفة ضمن العقود ومجدولة بشكل متجدد، مع الأعمال عند الطلب في الجدول نفسه.",
      },
    },
  },
  {
    key: "work-orders",
    icon: Wrench,
    category: "operations",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.9 FR-WO-001–007, §8.10 FR-FIELD-001–006, BR-WO-002, BR-FIELD-001–002, §38 state machine`,
    visual: "workOrder",
    relatedModules: ["scheduling", "billing", "command-center"],
    faqQuestions: ["Can field teams record work on site?"],
    workflow: {
      en: ["Created", "Assigned", "En route", "Arrived", "In progress", "Completed", "Verified", "Closed"],
      ar: ["مُنشأ", "مُسنَد", "في الطريق", "وصل", "قيد التنفيذ", "مكتمل", "تم التحقق", "مُغلق"],
    },
    copy: {
      en: {
        name: "Work Orders & Field Operations",
        short: "Assign work to the field, record completion on site, and verify it before billing.",
        value:
          "Work orders go to the right team with the site and contract attached. Completion is recorded on site, so the office sees verified work rather than a phone call.",
        capabilities: [
          "Work orders created from scheduled visits or on demand",
          "Assignment to a team or an employee",
          "Field employees see the work orders assigned to them, with the customer contact details they need",
          "Photos, notes, materials and signatures captured as execution evidence",
          "Completed work is verified before it can be billed",
        ],
        seoTitle: "Work Orders & Field Operations",
        seoDescription: "Assign work orders to field teams, capture execution evidence on site and verify completed work before billing.",
      },
      ar: {
        name: "أوامر العمل والعمليات الميدانية",
        short: "أسند العمل إلى الفرق الميدانية، وسجّل الإنجاز في الموقع، وتحقّق منه قبل الفوترة.",
        value: "تصل أوامر العمل إلى الفريق المناسب مرفقةً بالموقع والعقد. ويُسجَّل الإنجاز في الموقع، فيرى المكتب عملًا تم التحقق منه بدلًا من مجرد مكالمة هاتفية.",
        capabilities: [
          "أوامر عمل تُنشأ من الزيارات المجدولة أو عند الطلب",
          "الإسناد إلى فريق أو موظف",
          "يرى الموظف الميداني أوامر العمل المسندة إليه، مع بيانات التواصل التي يحتاجها",
          "توثيق الصور والملاحظات والمواد والتوقيعات كأدلة على التنفيذ",
          "يتم التحقق من العمل المكتمل قبل أن تمكن فوترته",
        ],
        seoTitle: "أوامر العمل والعمليات الميدانية",
        seoDescription: "أسند أوامر العمل إلى الفرق الميدانية، ووثّق أدلة التنفيذ في الموقع، وتحقّق من العمل المكتمل قبل الفوترة.",
      },
    },
  },
  {
    key: "billing",
    icon: ReceiptText,
    category: "finance",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.11 FR-BILL-001–008, BR-BILL-001–009, §38 state machine`,
    visual: "invoice",
    relatedModules: ["work-orders", "payments", "collections"],
    faqQuestions: ["How do invoices relate to the work we deliver?"],
    workflow: {
      en: ["Draft", "Issued", "Sent", "Partially paid", "Paid"],
      ar: ["مسودة", "صادرة", "مُرسلة", "مدفوعة جزئيًا", "مدفوعة"],
    },
    copy: {
      en: {
        name: "Billing & Invoicing",
        short: "Invoices raised against completed, verified work under the right contract.",
        value: "Bill against verified work under the right contract, so every invoice line traces back to the job and the agreement behind it.",
        capabilities: [
          "Draft invoices generated from verified work orders, following the contract's billing cycle",
          "A work order is never billed on two invoices",
          "Issued invoices are locked; corrections are made with credit notes",
          "Invoice status (partially paid, paid, overdue) calculated from recorded payments",
          "An invoice can only be cancelled before any money has moved, with a reason",
        ],
        seoTitle: "Billing & Invoicing",
        seoDescription: "Invoices generated from verified work orders under the right contract, with locked issued invoices and credit notes.",
      },
      ar: {
        name: "الفوترة وإصدار الفواتير",
        short: "فواتير تُصدَر مقابل عمل مكتمل تم التحقق منه ضمن العقد الصحيح.",
        value: "أصدر الفواتير مقابل عمل تم التحقق منه ضمن العقد الصحيح، ليرتبط كل بند في الفاتورة بالمهمة والاتفاقية التي تقف خلفها.",
        capabilities: [
          "فواتير مسودة تُنشأ من أوامر العمل المتحقق منها وفق دورة فوترة العقد",
          "لا يُفوتر أمر العمل الواحد في فاتورتين",
          "الفواتير الصادرة مقفلة، ويتم التصحيح عبر إشعارات دائنة",
          "حالة الفاتورة (مدفوعة جزئيًا، مدفوعة، متأخرة) تُحسب من المدفوعات المسجّلة",
          "لا يمكن إلغاء الفاتورة إلا قبل أي حركة مالية عليها، مع ذكر السبب",
        ],
        seoTitle: "الفوترة وإصدار الفواتير",
        seoDescription: "فواتير تُنشأ من أوامر العمل المتحقق منها ضمن العقد الصحيح، مع قفل الفواتير الصادرة والإشعارات الدائنة.",
      },
    },
  },
  {
    key: "payments",
    icon: CreditCard,
    category: "finance",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.12 FR-PAY-001–006, BR-PAY-001–004`,
    visual: "payment",
    relatedModules: ["billing", "collections", "reporting"],
    copy: {
      en: {
        name: "Payments",
        short: "Record payments against invoices so balances stay accurate.",
        value: "Record each payment once and allocate it to the invoices it settles, so every balance on every invoice stays accurate.",
        capabilities: [
          "Payments recorded with amount, currency, method, reference and date",
          "One payment allocated across one or more invoices",
          "Refunds and reversals recorded as separate, linked records",
          "Failed payment attempts recorded with a reason",
        ],
        seoTitle: "Payments",
        seoDescription: "Record payments and allocate them to invoices, with refunds and failed attempts kept as separate records.",
      },
      ar: {
        name: "المدفوعات",
        short: "سجّل المدفوعات مقابل الفواتير لتبقى الأرصدة دقيقة.",
        value: "سجّل كل دفعة مرة واحدة وخصّصها للفواتير التي تسددها، لتبقى أرصدة جميع الفواتير دقيقة.",
        capabilities: [
          "تسجيل المدفوعات بالمبلغ والعملة وطريقة الدفع والمرجع والتاريخ",
          "تخصيص الدفعة الواحدة على فاتورة واحدة أو أكثر",
          "تسجيل المبالغ المستردة والعكسية كسجلات منفصلة ومرتبطة",
          "تسجيل محاولات الدفع الفاشلة مع سببها",
        ],
        seoTitle: "المدفوعات",
        seoDescription: "سجّل المدفوعات وخصّصها للفواتير، مع حفظ المبالغ المستردة والمحاولات الفاشلة كسجلات منفصلة.",
      },
    },
  },
  {
    key: "collections",
    icon: Wallet,
    category: "finance",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.13 FR-COLLECT-001–006, BR-COLLECT-001–003`,
    visual: "collections",
    relatedModules: ["billing", "payments", "command-center"],
    copy: {
      en: {
        name: "Collections",
        short: "See overdue balances and follow up before they age further.",
        value: "Helps you follow up on overdue balances and organize collection actions, so nothing overdue is forgotten.",
        capabilities: [
          "A collection case opens when an invoice becomes overdue",
          "Overdue balances grouped by age",
          "Follow-up actions and notes recorded on each case",
          "Escalation to a manager",
          "Cases close automatically once the invoice is paid",
        ],
        seoTitle: "Collections",
        seoDescription: "Follow up on overdue invoices with collection cases, aging groups, follow-up notes and escalation.",
      },
      ar: {
        name: "التحصيل",
        short: "اطّلع على الأرصدة المتأخرة وتابعها قبل أن يزداد تأخرها.",
        value: "يساعدك على متابعة المتأخرات وتنظيم إجراءات التحصيل، حتى لا يُنسى أي رصيد متأخر.",
        capabilities: [
          "تُفتح حالة تحصيل عندما تتأخر الفاتورة",
          "تصنيف الأرصدة المتأخرة حسب عمرها",
          "تسجيل إجراءات المتابعة والملاحظات على كل حالة",
          "التصعيد إلى المدير",
          "تُغلق الحالة تلقائيًا عند سداد الفاتورة",
        ],
        seoTitle: "التحصيل",
        seoDescription: "تابع الفواتير المتأخرة عبر حالات التحصيل وتصنيف أعمار الذمم وملاحظات المتابعة والتصعيد.",
      },
    },
  },
  {
    key: "command-center",
    icon: BarChart3,
    category: "visibility",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.14 FR-CMDCTR-001–005, BR-CMDCTR-001–002`,
    visual: "commandCenter",
    relatedModules: ["reporting", "collections", "work-orders"],
    copy: {
      en: {
        name: "Command Center",
        short: "One view of the items that need attention across the operation.",
        value:
          "A read-only view built from the records in every other module: what needs attention, what is overdue and what is coming up, each linking to the record behind it.",
        capabilities: [
          "Attention list: expiring contracts, overdue invoices, delayed services, unassigned work orders and pending approvals",
          "Each item links to the record behind it",
          "Financial indicators shown only to users with financial access",
          "Every indicator has a documented definition",
        ],
        seoTitle: "Command Center",
        seoDescription: "One view of expiring contracts, overdue invoices, delayed services, unassigned work orders and pending approvals.",
      },
      ar: {
        name: "مركز التحكم",
        short: "عرض واحد للعناصر التي تحتاج إلى متابعة على امتداد العمليات.",
        value: "عرض للقراءة فقط مبني من سجلات جميع الوحدات الأخرى: ما يحتاج إلى متابعة، وما تأخر، وما هو قادم، مع ربط كل عنصر بسجله.",
        capabilities: [
          "قائمة المتابعة: العقود القريبة من الانتهاء والفواتير المتأخرة والخدمات المتأخرة وأوامر العمل غير المسندة والموافقات المعلقة",
          "يرتبط كل عنصر بسجله",
          "المؤشرات المالية تظهر فقط لمن يملك صلاحية الاطلاع المالي",
          "لكل مؤشر تعريف موثّق",
        ],
        seoTitle: "مركز التحكم",
        seoDescription: "عرض واحد للعقود القريبة من الانتهاء والفواتير والخدمات المتأخرة وأوامر العمل غير المسندة والموافقات المعلقة.",
      },
    },
  },
  {
    key: "reporting",
    icon: LineChart,
    category: "visibility",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.16 FR-REPORT-001–003, BR-REPORT-001`,
    visual: "report",
    relatedModules: ["command-center", "billing", "collections"],
    copy: {
      en: {
        name: "Reporting",
        short: "Operational and financial reports drawn from the same connected records.",
        value: "Reports read from the same records the rest of the platform uses, so the numbers in a report match the work, invoices and payments behind them.",
        capabilities: [
          "Report catalog: customers, active and expiring contracts, work order status, delayed work, invoices, receivables aging and payments",
          "Filters and pagination on every report",
          "Each report shows only what the viewer's branch and financial access allow",
          "CSV export",
        ],
        seoTitle: "Reporting",
        seoDescription: "Operational and financial reports on customers, contracts, work orders, invoices, receivables and payments, with CSV export.",
      },
      ar: {
        name: "التقارير",
        short: "تقارير تشغيلية ومالية مستمدة من السجلات المتصلة نفسها.",
        value: "تُقرأ التقارير من السجلات نفسها التي تستخدمها بقية المنصة، فتطابق أرقامها الأعمال والفواتير والمدفوعات التي تقف خلفها.",
        capabilities: [
          "كتالوج التقارير: العملاء، والعقود النشطة والقريبة من الانتهاء، وحالة أوامر العمل، والأعمال المتأخرة، والفواتير، وأعمار الذمم، والمدفوعات",
          "عوامل تصفية وتقسيم صفحات في كل تقرير",
          "يعرض كل تقرير فقط ما يسمح به فرع المستخدم وصلاحية الاطلاع المالي",
          "التصدير بصيغة CSV",
        ],
        seoTitle: "التقارير",
        seoDescription: "تقارير تشغيلية ومالية عن العملاء والعقود وأوامر العمل والفواتير والذمم والمدفوعات، مع التصدير بصيغة CSV.",
      },
    },
  },
  {
    key: "notifications",
    icon: Bell,
    category: "visibility",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.15 FR-NOTIFY-001–005, BR-NOTIFY-001–002, §22`,
    visual: "notifications",
    relatedModules: ["command-center", "contracts", "collections"],
    copy: {
      en: {
        name: "Notifications",
        short: "Timely alerts to the right people when something needs action.",
        value: "Notifications reach the person responsible when something needs action, such as a contract due for renewal, an overdue invoice or a delayed work order.",
        capabilities: [
          "In-app notifications addressed to the responsible person",
          "Email delivery",
          "One notification per condition, not a stream of repeats",
          "Each notification is visible only to the person it is addressed to",
          "Shown in the reader's language",
        ],
        seoTitle: "Notifications",
        seoDescription: "In-app and email notifications when a contract is due for renewal, an invoice is overdue or a work order is delayed.",
      },
      ar: {
        name: "الإشعارات",
        short: "تنبيهات في الوقت المناسب للأشخاص المعنيين عندما يتطلب أمر ما إجراءً.",
        value: "تصل الإشعارات إلى الشخص المسؤول عندما يتطلب أمر ما إجراءً، مثل عقد مستحق التجديد أو فاتورة متأخرة أو أمر عمل متأخر.",
        capabilities: [
          "إشعارات داخل المنصة موجهة إلى الشخص المسؤول",
          "التسليم عبر البريد الإلكتروني",
          "إشعار واحد لكل حالة، دون تكرار",
          "يظهر كل إشعار فقط للشخص الموجّه إليه",
          "تُعرض بلغة القارئ",
        ],
        seoTitle: "الإشعارات",
        seoDescription: "إشعارات داخل المنصة وعبر البريد الإلكتروني عند استحقاق تجديد عقد أو تأخر فاتورة أو أمر عمل.",
      },
    },
  },
  {
    key: "audit-logs",
    icon: ScrollText,
    category: "governance",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §8.17 FR-AUDIT-001–005, BR-AUDIT-001–003, §19`,
    visual: "audit",
    relatedModules: ["search", "command-center", "reporting"],
    copy: {
      en: {
        name: "Audit Logs",
        short: "A record of key actions, who took them and when.",
        value: "The system provides an audit layer for sensitive events and changes, within the scope of each tenant and the viewer's permissions.",
        capabilities: [
          "Sensitive actions recorded with the user, action, record, before and after values, time and IP address",
          "Filter by user, record, action and date",
          "Audit records can't be edited or deleted",
          "Export to CSV, and the export itself is recorded",
        ],
        seoTitle: "Audit Logs",
        seoDescription: "An audit layer for sensitive events and changes: who did what and when, with filters and CSV export.",
      },
      ar: {
        name: "سجلات التدقيق",
        short: "سجل بالإجراءات المهمة، ومن قام بها، ومتى.",
        value: "يوفر النظام طبقة تدقيق للأحداث والتغييرات الحساسة وفق نطاقات النظام والصلاحيات.",
        capabilities: [
          "تسجيل الإجراءات الحساسة مع المستخدم والإجراء والسجل والقيم قبل التغيير وبعده والوقت وعنوان IP",
          "التصفية حسب المستخدم والسجل والإجراء والتاريخ",
          "لا يمكن تعديل سجلات التدقيق أو حذفها",
          "التصدير بصيغة CSV، مع تسجيل عملية التصدير نفسها",
        ],
        seoTitle: "سجلات التدقيق",
        seoDescription: "طبقة تدقيق للأحداث والتغييرات الحساسة: من فعل ماذا ومتى، مع التصفية والتصدير بصيغة CSV.",
      },
    },
  },
  {
    key: "search",
    icon: Search,
    category: "visibility",
    status: "AVAILABLE",
    sourceReference: `${MASTER} §24 Global Search`,
    visual: "search",
    relatedModules: ["customer-management", "contracts", "work-orders"],
    copy: {
      en: {
        name: "Global Search",
        short: "Find customers, contracts, work orders and invoices quickly.",
        value: "Search helps you reach related records across the system from one search bar.",
        capabilities: [
          "Search across customers, contacts, contracts, invoices, work orders, documents and services",
          "Match by name, phone number or record number, exactly or partially",
          "Results limited to your tenant and what your role allows",
          "A clear message when nothing matches",
        ],
        seoTitle: "Global Search",
        seoDescription: "Search across customers, contacts, contracts, invoices, work orders, documents and services, within your permissions.",
      },
      ar: {
        name: "البحث الشامل",
        short: "اعثر على العملاء والعقود وأوامر العمل والفواتير بسرعة.",
        value: "يساعدك البحث على الوصول إلى السجلات ذات الصلة عبر النظام من شريط بحث واحد.",
        capabilities: [
          "البحث في العملاء وجهات الاتصال والعقود والفواتير وأوامر العمل والمستندات والخدمات",
          "المطابقة بالاسم أو رقم الهاتف أو رقم السجل، مطابقة تامة أو جزئية",
          "النتائج محصورة في مستأجرك وما يسمح به دورك",
          "رسالة واضحة عند عدم وجود نتائج",
        ],
        seoTitle: "البحث الشامل",
        seoDescription: "ابحث في العملاء وجهات الاتصال والعقود والفواتير وأوامر العمل والمستندات والخدمات ضمن صلاحياتك.",
      },
    },
  },
];

export function getModules(): ModuleRecord[] {
  return modules.filter((m) => isPublished(m.status));
}

export function getModule(key: string): ModuleRecord | undefined {
  return getModules().find((m) => m.key === key);
}

/** Localised view of a module record for page templates and cards. */
export function moduleCopy(module: ModuleRecord, locale: Locale): ModuleCopy {
  return module.copy[locale];
}

/* ------------------------------------------------------------------ */
/* Customer 360 (§14) and dashboard showcase (§12)                     */
/* ------------------------------------------------------------------ */

/** What Customer 360 aggregates (FR-CUST-007). Client health scoring is not documented and is not shown. */
export const customer360: Bi<{ heading: string; subheading: string; hub: string; items: string[]; note: string }> = {
  en: {
    heading: "Customer 360",
    hub: "Customer",
    subheading: "A customer is more than a contact. Customer 360 brings together everything connected to them.",
    items: ["Contacts", "Sites and addresses", "Contracts", "Work orders", "Invoices", "Documents", "Timeline"],
    note: "Each section follows the viewer's permissions; financial details need financial access.",
  },
  ar: {
    heading: "عرض العميل 360",
    hub: "العميل",
    subheading: "العميل أكثر من مجرد جهة اتصال. يجمع عرض العميل 360 كل ما يرتبط به.",
    items: ["جهات الاتصال", "المواقع والعناوين", "العقود", "أوامر العمل", "الفواتير", "المستندات", "السجل الزمني"],
    note: "يتبع كل قسم صلاحيات المستخدم، وتتطلب البيانات المالية صلاحية الاطلاع المالي.",
  },
};

/**
 * Dashboard showcase (§12.1): each question the Command Center answers,
 * mapped to the documented item that answers it (FR-CMDCTR-003, BR-CMDCTR-001).
 * Data sources: docs/srs-v2/05_DASHBOARD_VISUAL_MAPPING.md.
 */
export const dashboardQuestions: Bi<Array<{ question: string; answer: string }>> = {
  en: [
    { question: "What needs attention now?", answer: "An attention list of the items waiting on someone, each linking to its record." },
    { question: "What is overdue?", answer: "Overdue invoices and delayed services, surfaced before they age further." },
    { question: "What is coming up?", answer: "Contracts approaching their end date and due for renewal." },
    { question: "What is the workload?", answer: "Work orders waiting to be assigned, and approvals waiting for a decision." },
    { question: "How are customers doing?", answer: "Customer 360 shows each customer's contracts, work, invoices and documents." },
    { question: "Where do revenue and collections stand?", answer: "Financial indicators, shown only to people with financial access." },
  ],
  ar: [
    { question: "ما الذي يحتاج إلى متابعة الآن؟", answer: "قائمة متابعة بالعناصر التي تنتظر إجراءً من أحد، ويرتبط كل عنصر بسجله." },
    { question: "ما الذي تأخر؟", answer: "الفواتير المتأخرة والخدمات المتأخرة، قبل أن يزداد تأخرها." },
    { question: "ما القادم؟", answer: "العقود التي تقترب من تاريخ انتهائها وتستحق التجديد." },
    { question: "ما حجم العمل؟", answer: "أوامر العمل التي تنتظر الإسناد، والموافقات التي تنتظر قرارًا." },
    { question: "ما حالة العملاء؟", answer: "يعرض عرض العميل 360 عقود كل عميل وأعماله وفواتيره ومستنداته." },
    { question: "أين تقف الإيرادات والتحصيل؟", answer: "مؤشرات مالية تظهر فقط لمن يملك صلاحية الاطلاع المالي." },
  ],
};

/* ------------------------------------------------------------------ */
/* Capability matrix (§5, §96)                                          */
/* ------------------------------------------------------------------ */

type CapabilityLink = { module: ModuleKey; hash?: string } | { route: RouteKey; hash?: string };

export type Capability = {
  key: string;
  /** SRS §5 capability group. */
  srsGroup: string;
  /** Homepage capability-map group; only set for published items. */
  group?: CapabilityGroup;
  name: Bi<string>;
  status: CapabilityStatus;
  source: string;
  link?: CapabilityLink;
  /** Why it is not on the website (§96), for unpublished items. */
  reason?: string;
};

const ESIGN_LAUNCH = `${PRICING}: "at launch"; ${MASTER} §8.27 (Post-MVP)`;

export const capabilities: Capability[] = [
  // Customer
  { key: "customer_management", srsGroup: "Customer", group: "customer", name: { en: "Customer management", ar: "إدارة العملاء" }, status: "AVAILABLE", source: `${MASTER} FR-CUST-001–006`, link: { module: "customer-management" } },
  { key: "customer_360", srsGroup: "Customer", group: "customer", name: { en: "Customer 360", ar: "عرض العميل 360" }, status: "AVAILABLE", source: `${MASTER} FR-CUST-007`, link: { module: "customer-management", hash: "customer-360" } },
  { key: "contacts", srsGroup: "Customer", group: "customer", name: { en: "Contacts and sites", ar: "جهات الاتصال والمواقع" }, status: "AVAILABLE", source: `${MASTER} FR-CUST-005–006`, link: { module: "customer-management" } },
  { key: "companies_legal_entities", srsGroup: "Customer", name: { en: "Companies / legal entities", ar: "الشركات / الكيانات القانونية" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §16 only", reason: "Not in the Master SRS module scope; needs Product Owner confirmation." },
  { key: "requests", srsGroup: "Customer", name: { en: "Requests", ar: "الطلبات" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §5 only", reason: "Not documented in the Master SRS." },
  { key: "client_portal", srsGroup: "Customer", name: { en: "Client portal", ar: "بوابة العملاء" }, status: "ROADMAP", source: `${MASTER} §6 Tranche 2, OQ-013`, reason: "Roadmap (Tranche 2); no approval to publish." },
  { key: "communication", srsGroup: "Customer", name: { en: "Communication", ar: "التواصل" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §5 only", reason: "Not documented; WhatsApp/SMS channels are deferred (DEC-006)." },
  // CRM
  { key: "advanced_crm", srsGroup: "CRM", name: { en: "Advanced CRM", ar: "إدارة علاقات العملاء المتقدمة" }, status: "ROADMAP", source: `${MASTER} §8.29 (Tranche 1, specified, not implemented)`, reason: "Specified but not implemented; no approval to publish." },
  { key: "sales_pipeline", srsGroup: "CRM", name: { en: "Sales pipeline", ar: "مسار المبيعات" }, status: "ROADMAP", source: `${MASTER} §8.30`, reason: "Specified but not implemented." },
  { key: "quotations", srsGroup: "CRM", name: { en: "Quotations & proposals", ar: "عروض الأسعار والاقتراحات" }, status: "ROADMAP", source: `${MASTER} §8.31`, reason: "Specified but not implemented." },
  // Contracts
  { key: "contract_management", srsGroup: "Contracts", group: "contracts", name: { en: "Contract management", ar: "إدارة العقود" }, status: "AVAILABLE", source: `${MASTER} FR-CONTRACT-001–006`, link: { module: "contracts" } },
  { key: "contract_types", srsGroup: "Contracts", group: "contracts", name: { en: "Contract types", ar: "أنواع العقود" }, status: "AVAILABLE", source: `${MASTER} FR-CONTRACT-001`, link: { module: "contracts" } },
  { key: "renewals", srsGroup: "Contracts", group: "contracts", name: { en: "Renewals", ar: "التجديدات" }, status: "AVAILABLE", source: `${MASTER} FR-CONTRACT-007–008; ${PRICING} contract_renewals`, link: { module: "contracts" } },
  { key: "clauses", srsGroup: "Contracts", group: "contracts", name: { en: "Legal clauses", ar: "البنود القانونية" }, status: "COMING_SOON", source: `${PRICING}: legal_clauses "at launch"`, link: { module: "contracts", hash: "coming-soon" } },
  { key: "electronic_signature", srsGroup: "Contracts", group: "contracts", name: { en: "Electronic signature", ar: "التوقيع الإلكتروني" }, status: "COMING_SOON", source: ESIGN_LAUNCH, link: { module: "contracts", hash: "coming-soon" } },
  { key: "multi_party_signing", srsGroup: "Contracts", group: "contracts", name: { en: "Multi-party signing", ar: "توقيع الأطراف المتعددة" }, status: "COMING_SOON", source: ESIGN_LAUNCH, link: { module: "contracts", hash: "coming-soon" } },
  { key: "signature_evidence", srsGroup: "Contracts", group: "contracts", name: { en: "Signature evidence and contract finalization", ar: "أدلة التوقيع وإصدار النسخة النهائية للعقد" }, status: "COMING_SOON", source: ESIGN_LAUNCH, link: { module: "contracts", hash: "coming-soon" } },
  { key: "templates", srsGroup: "Contracts", name: { en: "Contract templates / library", ar: "قوالب العقود / المكتبة" }, status: "DECISION_REQUIRED", source: `${PRICING} (available) vs ${MASTER} §8.24/§8.28 (Post-MVP, not implemented)`, reason: "Sources conflict; shown on Pricing only until the Product Owner decides." },
  { key: "versions", srsGroup: "Contracts", name: { en: "Contract versions", ar: "إصدارات العقود" }, status: "DECISION_REQUIRED", source: `${MASTER} §8.25 (Post-MVP)`, reason: "Post-MVP document versioning; not confirmed." },
  { key: "obligations", srsGroup: "Contracts", name: { en: "Obligations", ar: "الالتزامات" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §5 only", reason: "Not documented in the Master SRS." },
  { key: "document_generation", srsGroup: "Contracts", name: { en: "Document generation", ar: "توليد المستندات" }, status: "ROADMAP", source: `${MASTER} §8.25 (Phase 2)`, reason: "Phase 2." },
  { key: "secure_sharing", srsGroup: "Contracts", name: { en: "Secure sharing", ar: "المشاركة الآمنة" }, status: "DECISION_REQUIRED", source: `${PRICING} contract_sharing (available) vs ${MASTER} §8.26 (Phase 2)`, reason: "Sources conflict; shown on Pricing only until the Product Owner decides." },
  { key: "tracking", srsGroup: "Contracts", name: { en: "Distribution tracking", ar: "تتبع التوزيع" }, status: "DECISION_REQUIRED", source: `${PRICING} distribution_tracking (available) vs ${MASTER} §8.26 (Phase 2)`, reason: "Sources conflict; shown on Pricing only until the Product Owner decides." },
  // Services & operations
  { key: "service_management", srsGroup: "Services", group: "operations", name: { en: "Service management", ar: "إدارة الخدمات" }, status: "AVAILABLE", source: `${MASTER} FR-SERVICE-001–004`, link: { module: "scheduling" } },
  { key: "service_catalog", srsGroup: "Services", name: { en: "Service catalog (workflow, SLA, required documents)", ar: "كتالوج الخدمات" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §17 only", reason: "The documented service definition has no workflow or required-documents model." },
  { key: "scheduling", srsGroup: "Operations", group: "operations", name: { en: "Scheduling", ar: "الجدولة" }, status: "AVAILABLE", source: `${MASTER} FR-SCHED-001–006`, link: { module: "scheduling" } },
  { key: "work_orders", srsGroup: "Operations", group: "operations", name: { en: "Work orders", ar: "أوامر العمل" }, status: "AVAILABLE", source: `${MASTER} FR-WO-001–007`, link: { module: "work-orders" } },
  { key: "field_operations", srsGroup: "Operations", group: "operations", name: { en: "Field operations", ar: "العمليات الميدانية" }, status: "AVAILABLE", source: `${MASTER} FR-FIELD-001–006 (GPS excluded, OQ-002)`, link: { module: "work-orders" } },
  { key: "execution_evidence", srsGroup: "Documents", group: "operations", name: { en: "Execution evidence", ar: "أدلة التنفيذ" }, status: "AVAILABLE", source: `${MASTER} FR-FIELD-004, BR-FIELD-002`, link: { module: "work-orders" } },
  { key: "workflow_engine", srsGroup: "Operations", name: { en: "Workflow engine", ar: "محرك سير العمل" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §19 only", reason: "Not documented in the Master SRS (fixed state machines only)." },
  { key: "work_templates", srsGroup: "Operations", name: { en: "Work templates", ar: "قوالب الأعمال" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §20 only", reason: "Not documented; §20 forbids showing templates that aren't AVAILABLE." },
  // Compliance
  { key: "tax_due_dates", srsGroup: "Compliance", name: { en: "Tax / compliance due dates", ar: "الاستحقاقات الضريبية والامتثال" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §24 only", reason: "Not documented in the Master SRS; tax rules are deferred (DEC-007)." },
  { key: "compliance_calendar", srsGroup: "Compliance", name: { en: "Compliance calendar / center", ar: "تقويم ومركز الامتثال" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §25 only", reason: "Not documented in the Master SRS." },
  { key: "compliance_evidence", srsGroup: "Compliance", name: { en: "Compliance evidence and escalation", ar: "أدلة الامتثال والتصعيد" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §24 only", reason: "Not documented; work-order evidence is published separately." },
  // Documents
  { key: "dms", srsGroup: "Documents", name: { en: "Document management", ar: "إدارة المستندات" }, status: "ROADMAP", source: `${MASTER} §6 Phase 2 (Documents)`, reason: "Phase 2." },
  { key: "document_requests", srsGroup: "Documents", name: { en: "Document requests", ar: "طلبات المستندات" }, status: "DECISION_REQUIRED", source: "WEB-MKT-SRS-002 §31 only", reason: "Not documented." },
  { key: "ocr", srsGroup: "Documents", name: { en: "OCR", ar: "التعرف الضوئي على النصوص" }, status: "NOT_PUBLISHED", source: "WEB-MKT-SRS-002 §5", reason: "§5: not shown as a final capability without approval." },
  // Finance
  { key: "billing", srsGroup: "Finance", group: "finance", name: { en: "Billing and invoicing", ar: "الفوترة وإصدار الفواتير" }, status: "AVAILABLE", source: `${MASTER} FR-BILL-001–008`, link: { module: "billing" } },
  { key: "payments", srsGroup: "Finance", group: "finance", name: { en: "Payments", ar: "المدفوعات" }, status: "AVAILABLE", source: `${MASTER} FR-PAY-001–006`, link: { module: "payments" } },
  { key: "collections", srsGroup: "Finance", group: "finance", name: { en: "Collections", ar: "التحصيل" }, status: "AVAILABLE", source: `${MASTER} FR-COLLECT-001–006`, link: { module: "collections" } },
  { key: "profitability", srsGroup: "Finance", name: { en: "Profitability", ar: "الربحية" }, status: "ROADMAP", source: `${MASTER} §6 Phase 3, OQ-006`, reason: "Phase 3." },
  // Visibility
  { key: "command_center", srsGroup: "Visibility", group: "visibility", name: { en: "Command Center", ar: "مركز التحكم" }, status: "AVAILABLE", source: `${MASTER} FR-CMDCTR-001–005`, link: { module: "command-center" } },
  { key: "dashboard_kpis", srsGroup: "Visibility", group: "visibility", name: { en: "Dashboard indicators and alerts", ar: "مؤشرات وتنبيهات لوحة المتابعة" }, status: "AVAILABLE", source: `${MASTER} FR-CMDCTR-002–003, BR-CMDCTR-002`, link: { module: "command-center" } },
  { key: "reporting", srsGroup: "Visibility", group: "visibility", name: { en: "Reports", ar: "التقارير" }, status: "AVAILABLE", source: `${MASTER} FR-REPORT-001–003`, link: { module: "reporting" } },
  { key: "advanced_reports", srsGroup: "Visibility", group: "visibility", name: { en: "Advanced business reports", ar: "تقارير الأعمال المتقدمة" }, status: "COMING_SOON", source: `${PRICING}: advanced_reports "at launch"`, link: { module: "reporting", hash: "coming-soon" } },
  { key: "notifications", srsGroup: "Platform", group: "visibility", name: { en: "Notifications", ar: "الإشعارات" }, status: "AVAILABLE", source: `${MASTER} FR-NOTIFY-001–005`, link: { module: "notifications" } },
  { key: "global_search", srsGroup: "Platform", group: "visibility", name: { en: "Global search", ar: "البحث الشامل" }, status: "AVAILABLE", source: `${MASTER} §24`, link: { module: "search" } },
  // Governance / security
  { key: "authentication", srsGroup: "Security", group: "governance", name: { en: "Authentication", ar: "المصادقة" }, status: "AVAILABLE", source: `${MASTER} FR-AUTH-001–006, §18`, link: { route: "security", hash: "authentication" } },
  { key: "multi_tenant", srsGroup: "Security", group: "governance", name: { en: "Multi-tenant isolation", ar: "العزل بين المستأجرين" }, status: "AVAILABLE", source: `${MASTER} §8.1, §11`, link: { route: "security", hash: "tenant-isolation" } },
  { key: "organizations_branches", srsGroup: "Security", group: "governance", name: { en: "Organizations and branches", ar: "المنظمات والفروع" }, status: "AVAILABLE", source: `${MASTER} FR-ORG-001–004`, link: { route: "security", hash: "organizations" } },
  { key: "users_roles", srsGroup: "Security", group: "governance", name: { en: "Users and roles", ar: "المستخدمون والأدوار" }, status: "AVAILABLE", source: `${MASTER} FR-USER-001–005, §10`, link: { route: "security", hash: "access-control" } },
  { key: "rbac", srsGroup: "Security", group: "governance", name: { en: "Role-based access control", ar: "التحكم في الوصول حسب الأدوار" }, status: "AVAILABLE", source: `${MASTER} §10, BR-USER-001`, link: { route: "security", hash: "access-control" } },
  { key: "audit_logs", srsGroup: "Platform", group: "governance", name: { en: "Audit logs", ar: "سجلات التدقيق" }, status: "AVAILABLE", source: `${MASTER} FR-AUDIT-001–005`, link: { module: "audit-logs" } },
  { key: "mfa", srsGroup: "Security", name: { en: "MFA / 2FA", ar: "المصادقة متعددة العوامل" }, status: "ROADMAP", source: `${MASTER} §18 ADR-010 (optional, future)`, reason: "§49: not shown because it is on the roadmap only." },
  // Commercial
  { key: "pricing_plans", srsGroup: "Commercial", name: { en: "Pricing / plans", ar: "الأسعار والباقات" }, status: "AVAILABLE", source: PRICING, link: { route: "pricing" }, reason: "Published on the Pricing page from the pricing source, not on the capability map." },
  { key: "entitlements", srsGroup: "Commercial", name: { en: "Entitlements", ar: "الاستحقاقات" }, status: "INTERNAL", source: `${MASTER} §8.20`, reason: "Internal; surfaces indirectly through Pricing." },
  { key: "referral_affiliate", srsGroup: "Commercial", name: { en: "Referral / affiliate", ar: "الإحالة والشراكة" }, status: "ROADMAP", source: `${MASTER} §8.22 (Phase 2)`, reason: "Phase 2; no marketing need approved." },
  // Platform
  { key: "api", srsGroup: "Platform", name: { en: "API", ar: "واجهة برمجة التطبيقات" }, status: "ROADMAP", source: `${MASTER} §6 Phase 5`, reason: "Not published (Phase 5)." },
  { key: "webhooks", srsGroup: "Platform", name: { en: "Webhooks", ar: "Webhooks" }, status: "ROADMAP", source: `${MASTER} §6 Phase 5, Tranche 4`, reason: "Not published." },
  { key: "integration_hub", srsGroup: "Platform", name: { en: "Integration hub", ar: "مركز التكاملات" }, status: "ROADMAP", source: `${MASTER} §6 Tranche 4, §31`, reason: "Roadmap; no vendor integrations are approved." },
  // Intelligence
  { key: "ai_copilot", srsGroup: "Intelligence", name: { en: "AI / Copilot", ar: "الذكاء الاصطناعي / المساعد" }, status: "ROADMAP", source: `${MASTER} §6 Phase 4; WEB-MKT-SRS-002 §53`, reason: "§53: never shown as available; roadmap display not approved." },
];

/** Published capabilities in homepage-map groups (§11). */
export function capabilityMap(): Array<{ group: CapabilityGroup; items: Capability[] }> {
  return groupOrder.map((group) => ({
    group,
    items: capabilities.filter((c) => c.group === group && isPublished(c.status)),
  }));
}

/** COMING_SOON capabilities described on a module page. */
export function comingSoonFor(module: ModuleKey): Capability[] {
  return capabilities.filter((c) => c.status === "COMING_SOON" && c.link && "module" in c.link && c.link.module === module);
}
