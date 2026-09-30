import type { Locale } from "@/i18n/locales";
import type { ModuleKey, VisualKey } from "./catalog";

/**
 * The connected product journey: one source for the homepage connected-system
 * visual (WEB-MKT-SRS-002 §10) and the How It Works stages (§60).
 *
 * The SRS lists "Company" as its own stage. Companies / legal entities are
 * DECISION_REQUIRED in the capability catalog (not in the Master SRS scope),
 * so that stage is left out until the Product Owner confirms it. The
 * customer record already holds the customer's company details.
 * "Review / approval" is documented as work-order verification (BR-WO-002)
 * and contract approval (FR-CONTRACT-002).
 *
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */
export type JourneyStage = {
  key: string;
  module: ModuleKey;
  /** Anchor on the module page, when the stage maps to one section. */
  hash?: string;
  visual: VisualKey;
  /** Part of the §10 homepage chain (review is How It Works only). */
  inChain: boolean;
  copy: Record<Locale, { label: string; title: string; description: string }>;
};

export const journey: JourneyStage[] = [
  {
    key: "customer",
    module: "customer-management",
    visual: "customer",
    inChain: true,
    copy: {
      en: { label: "Customer", title: "Add the customer", description: "Create one record per customer with their company details, contacts and sites. Every later step refers back to it." },
      ar: { label: "العميل", title: "أضف العميل", description: "أنشئ سجلًا واحدًا لكل عميل يضم بيانات شركته وجهات الاتصال والمواقع. وتعود إليه كل خطوة لاحقة." },
    },
  },
  {
    key: "contract",
    module: "contracts",
    visual: "contract",
    inChain: true,
    copy: {
      en: { label: "Contract", title: "Set up the contract", description: "Record the agreement: value, term, billing cycle and the services it covers. It is reviewed and approved before it becomes active." },
      ar: { label: "العقد", title: "أنشئ العقد", description: "سجّل الاتفاقية: القيمة والمدة ودورة الفوترة والخدمات التي يشملها. ويُراجَع العقد ويُعتمد قبل أن يصبح نشطًا." },
    },
  },
  {
    key: "service",
    module: "scheduling",
    visual: "service",
    inChain: true,
    copy: {
      en: { label: "Service", title: "Define the services", description: "Under the active contract, define each service: frequency, duration, location, resources and instructions." },
      ar: { label: "الخدمة", title: "عرّف الخدمات", description: "ضمن العقد النشط، عرّف كل خدمة: التكرار والمدة والموقع والموارد والتعليمات." },
    },
  },
  {
    key: "schedule",
    module: "scheduling",
    visual: "schedule",
    inChain: true,
    copy: {
      en: { label: "Schedule", title: "Schedule the work", description: "Visits are generated on a rolling schedule from each service, and on-demand jobs join the same schedule." },
      ar: { label: "الجدولة", title: "جدول العمل", description: "تُولَّد الزيارات على جدول متجدد من كل خدمة، وتنضم الأعمال عند الطلب إلى الجدول نفسه." },
    },
  },
  {
    key: "work",
    module: "work-orders",
    visual: "workOrder",
    inChain: true,
    copy: {
      en: { label: "Work", title: "Execute the work", description: "Work orders are assigned to a team or employee, who sees their assigned work and moves it through to completion." },
      ar: { label: "العمل", title: "نفّذ العمل", description: "تُسند أوامر العمل إلى فريق أو موظف، يرى الأعمال المسندة إليه وينقلها حتى الإنجاز." },
    },
  },
  {
    key: "documents",
    module: "work-orders",
    visual: "evidence",
    inChain: true,
    copy: {
      en: { label: "Documents", title: "Capture the evidence", description: "Photos, notes, materials and the customer's signature are attached to the work order as execution evidence." },
      ar: { label: "المستندات", title: "وثّق الأدلة", description: "تُرفق الصور والملاحظات والمواد وتوقيع العميل بأمر العمل كأدلة على التنفيذ." },
    },
  },
  {
    key: "review",
    module: "work-orders",
    visual: "verification",
    inChain: false,
    copy: {
      en: { label: "Review", title: "Review and verify", description: "A supervisor verifies completed work. Only verified work orders can be billed." },
      ar: { label: "المراجعة", title: "راجع وتحقّق", description: "يتحقق المشرف من العمل المكتمل، ولا يمكن فوترة إلا أوامر العمل التي تم التحقق منها." },
    },
  },
  {
    key: "billing",
    module: "billing",
    visual: "invoice",
    inChain: true,
    copy: {
      en: { label: "Billing", title: "Bill the verified work", description: "Draft invoices are generated from verified work orders under the contract's billing cycle, so every line traces back to the job." },
      ar: { label: "الفوترة", title: "فوتر العمل المتحقق منه", description: "تُنشأ فواتير مسودة من أوامر العمل المتحقق منها وفق دورة فوترة العقد، ليرتبط كل بند بالمهمة." },
    },
  },
  {
    key: "payment",
    module: "payments",
    visual: "payment",
    inChain: true,
    copy: {
      en: { label: "Payment", title: "Record the payment", description: "Payments are recorded and allocated to the invoices they settle, and each invoice's status follows from them." },
      ar: { label: "الدفع", title: "سجّل الدفعة", description: "تُسجَّل المدفوعات وتُخصَّص للفواتير التي تسددها، وتتحدد حالة كل فاتورة بناءً عليها." },
    },
  },
  {
    key: "collections",
    module: "collections",
    visual: "collections",
    inChain: true,
    copy: {
      en: { label: "Collections", title: "Follow up on what is overdue", description: "Overdue invoices open a collection case, so follow-up is organized before balances age further." },
      ar: { label: "التحصيل", title: "تابع المتأخرات", description: "تفتح الفواتير المتأخرة حالة تحصيل، لتنتظم المتابعة قبل أن تتقادم الأرصدة." },
    },
  },
  {
    key: "reporting",
    module: "reporting",
    visual: "report",
    inChain: true,
    copy: {
      en: { label: "Reporting", title: "Report and review", description: "Reports and the Command Center read from the same records, showing what needs attention and how the operation is doing." },
      ar: { label: "التقارير", title: "راجع التقارير", description: "تقرأ التقارير ومركز التحكم من السجلات نفسها، فتعرض ما يحتاج إلى متابعة وكيف تسير العمليات." },
    },
  },
  {
    key: "renewal",
    module: "contracts",
    visual: "contract",
    inChain: true,
    copy: {
      en: { label: "Renewal", title: "Renew on time", description: "Contracts approaching their end date raise a renewal alert, and the renewal is recorded on the contract." },
      ar: { label: "التجديد", title: "جدّد في الوقت المناسب", description: "تُطلق العقود التي تقترب من تاريخ انتهائها تنبيهًا بالتجديد، ويُسجَّل التجديد على العقد." },
    },
  },
];

/**
 * End-to-end example (§61) using the same fictional demo records as the
 * illustrative visuals (Northwind Facilities, CON-1042, SRV-2210, WO-3318,
 * INV-2207, PAY-4410, Field team 2). Eleven steps in four phases; numbering
 * runs continuously across phases. Copy only restates documented behaviour.
 */
export type ExampleStep = { title: string; text: string };
export type ExamplePhase = { title: string; steps: ExampleStep[] };
export type EndToEndExample = { eyebrow: string; heading: string; subheading: string; note: string; phases: ExamplePhase[] };

export const endToEndExample: Record<Locale, EndToEndExample> = {
  en: {
    eyebrow: "Walkthrough",
    heading: "An example, end to end",
    subheading: "Follow a single annual maintenance contract through the platform, from the first customer record to its renewal.",
    note: "Illustrative example with fictional demo data.",
    phases: [
      {
        title: "Set up the relationship",
        steps: [
          { title: "Customer added", text: "Northwind Facilities is added as a customer, together with its contacts and three sites." },
          { title: "Contract approved", text: "Annual maintenance contract CON-1042 is drafted, reviewed and approved." },
          { title: "Service defined", text: "Service SRV-2210, quarterly HVAC maintenance at Site A, is defined under the contract." },
        ],
      },
      {
        title: "Deliver the work",
        steps: [
          { title: "Visit scheduled", text: "The quarterly visit is scheduled and becomes work order WO-3318, assigned to Field team 2." },
          { title: "Work completed on site", text: "The team completes the checklist, attaches photos and captures the customer's signature." },
          { title: "Work verified", text: "A field supervisor verifies the completed work order." },
        ],
      },
      {
        title: "Bill and collect",
        steps: [
          { title: "Invoice issued", text: "Invoice INV-2207 is generated from the verified work and issued." },
          { title: "Payment allocated", text: "Payment PAY-4410 is recorded and allocated to INV-2207." },
          { title: "Collections, if needed", text: "Had the invoice gone overdue, a collection case would have opened for follow-up." },
        ],
      },
      {
        title: "Review and renew",
        steps: [
          { title: "Visibility updated", text: "Reports and the Command Center reflect the work, the invoice and the payment." },
          { title: "Renewal flagged", text: "As its end date approaches, CON-1042 raises a renewal alert." },
        ],
      },
    ],
  },
  ar: {
    eyebrow: "جولة تطبيقية",
    heading: "مثال من البداية إلى النهاية",
    subheading: "تابع عقد صيانة سنويًا واحدًا عبر المنصة، من أول سجل للعميل حتى تجديده.",
    note: "مثال توضيحي ببيانات تجريبية غير حقيقية.",
    phases: [
      {
        title: "تأسيس العلاقة",
        steps: [
          { title: "إضافة العميل", text: "تُضاف نورث ويند للمرافق كعميل، مع جهات الاتصال ومواقعها الثلاثة." },
          { title: "اعتماد العقد", text: "يُعَدّ عقد الصيانة السنوية CON-1042، ثم يُراجَع ويُعتمد." },
          { title: "تعريف الخدمة", text: "تُعرَّف الخدمة SRV-2210، صيانة التكييف ربع السنوية في الموقع أ، ضمن العقد." },
        ],
      },
      {
        title: "تنفيذ العمل",
        steps: [
          { title: "جدولة الزيارة", text: "تُجدول الزيارة ربع السنوية فتصبح أمر العمل WO-3318، المسند إلى الفريق الميداني 2." },
          { title: "إنجاز العمل في الموقع", text: "يُكمل الفريق قائمة التحقق ويرفق الصور ويوثّق توقيع العميل." },
          { title: "التحقق من العمل", text: "يتحقق المشرف الميداني من أمر العمل المكتمل." },
        ],
      },
      {
        title: "الفوترة والتحصيل",
        steps: [
          { title: "إصدار الفاتورة", text: "تُنشأ الفاتورة INV-2207 من العمل المتحقق منه وتُصدر." },
          { title: "تخصيص الدفعة", text: "تُسجَّل الدفعة PAY-4410 وتُخصَّص للفاتورة INV-2207." },
          { title: "التحصيل عند الحاجة", text: "لو تأخرت الفاتورة، لفُتحت حالة تحصيل لمتابعتها." },
        ],
      },
      {
        title: "المتابعة والتجديد",
        steps: [
          { title: "تحديث الرؤية", text: "تعكس التقارير ومركز التحكم العمل والفاتورة والدفعة." },
          { title: "التنبيه بالتجديد", text: "مع اقتراب تاريخ انتهائه، يُطلق العقد CON-1042 تنبيهًا بالتجديد." },
        ],
      },
    ],
  },
};
