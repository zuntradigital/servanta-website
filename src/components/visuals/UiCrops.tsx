import type { ReactNode } from "react";
import { brand } from "@/config/brand";
import { illustrativeCaptionFor } from "@/content/shared";
import type { Locale } from "@/i18n/locales";
import { cx } from "@/lib/cx";
import { ProductFrame } from "./ProductFrame";
import styles from "./UiCrops.module.css";

/**
 * Focused, illustrative UI compositions for Features, Platform and How It
 * Works (spec §8). Built from the design tokens and labelled as
 * illustrative until real product screenshots exist (DG-005).
 * Sample records are fictional placeholders; amounts, counts and record
 * ids are identical in every locale.
 * Arabic copy drafted for this build; needs review by a native Arabic copy editor before launch.
 */

type CropProps = { onAlt?: boolean; locale?: Locale };

type SiteKey = "A" | "B" | "C" | "D" | "E" | "F";
type EventKind = "hvac" | "repair" | "inspection" | "cleaning";

const en = {
  listSep: ", ",
  site: "Site",
  siteLetters: { A: "A", B: "B", C: "C", D: "D", E: "E", F: "F" } as Record<SiteKey, string>,
  customer: {
    description: "a customer record with contacts, sites and linked contracts",
    title: "Customer record",
    active: "Active",
    customer: "Customer",
    customerName: "Northwind Facilities",
    primaryContact: "Primary contact",
    operationsManager: "Operations Manager",
    sites: "Sites",
    contracts: "Contracts",
    activeCount: "active",
    openWorkOrders: "Open work orders",
    balanceDue: "Balance due",
  },
  contract: {
    description: "a contract detail panel showing value, term, renewal date and covered services",
    title: "Annual maintenance",
    renewal: "Renewal in 30 days",
    contractValue: "Contract value",
    term: "Term",
    termValue: "12 months",
    billing: "Billing",
    monthly: "Monthly",
    services: ["HVAC maintenance", "Quarterly inspection", "On-demand repairs"],
  },
  schedule: {
    description: "a weekly scheduling calendar mixing recurring contract visits and on-demand jobs",
    title: "Schedule · This week",
    chip: "Recurring + on-demand",
    days: ["Sun", "Mon", "Tue", "Wed", "Thu"],
    events: { hvac: "HVAC", repair: "Repair", inspection: "Inspection", cleaning: "Cleaning" } as Record<EventKind, string>,
  },
  workOrder: {
    description: "a work order detail panel with assignment, checklist and completion status",
    title: "Quarterly HVAC service",
    inProgress: "In progress",
    site: "Site",
    mainBuilding: "Main building",
    assignedTo: "Assigned to",
    fieldTeam: "Field team 2",
    contract: "Contract",
    steps: ["Arrived on site", "Checklist completed", "Photos attached", "Customer sign-off"],
  },
  invoice: {
    description: "an invoice generated from completed work orders under a contract",
    issued: "Issued",
    vat: "VAT",
    total: "Total",
  },
  collections: {
    description: "a receivables aging summary showing current and overdue balances",
    title: "Receivables aging",
    thisMonth: "This month",
    current: "Current",
    days: "days",
  },
  service: {
    description: "a service definition under a contract with frequency, duration, location and assigned team",
    title: "HVAC maintenance",
    active: "Active",
    frequency: "Frequency",
    quarterly: "Quarterly",
    duration: "Duration",
    durationValue: "3 hours",
    location: "Location",
    resources: "Resources",
  },
  evidence: {
    description: "execution evidence attached to a work order: photos, notes, materials and a customer signature",
    title: "Execution evidence",
    photos: "Photos",
    notes: "Technician notes",
    notesValue: "Filters replaced, system tested",
    materials: "Materials",
    materialsValue: "2 × air filter",
    signature: "Customer signature",
    captured: "Captured",
  },
  verification: {
    description: "a supervisor verifying a completed work order before it becomes billable",
    title: "Verification",
    states: ["Completed", "Verified", "Closed"],
    verifiedBy: "Verified by",
    supervisor: "Field supervisor",
    billable: "Ready to bill",
  },
  payment: {
    description: "a recorded payment allocated to an invoice",
    title: "Payment recorded",
    allocated: "Allocated",
    method: "Method",
    bankTransfer: "Bank transfer",
    reference: "Reference",
    allocation: "Allocated to",
    remaining: "Remaining on invoice",
  },
  report: {
    description: "the report catalog with operational and financial reports and CSV export",
    title: "Reports",
    export: "Export CSV",
    items: ["Customer list", "Active and expiring contracts", "Work order status", "Delayed work orders", "Invoices", "Receivables aging", "Payments"],
  },
  notifications: {
    description: "an inbox of notifications for a contract due for renewal, an overdue invoice and a delayed work order",
    title: "Notifications",
    unread: "3 unread",
    items: [
      { text: "Contract CON-1042 ends in 30 days", meta: "Renewal" },
      { text: "Invoice INV-2207 is overdue", meta: "Collections" },
      { text: "Work order WO-3325 is delayed", meta: "Operations" },
    ],
  },
  audit: {
    description: "audit log entries showing who changed which record and when",
    title: "Audit log",
    entries: [
      { actor: "Finance manager", action: "Issued invoice INV-2207" },
      { actor: "Field supervisor", action: "Verified work order WO-3318" },
      { actor: "Account manager", action: "Approved contract CON-1042" },
    ],
  },
  search: {
    description: "global search results for one query across customers, contracts, work orders and invoices",
    query: "Northwind",
    results: [
      { type: "Customer", label: "Northwind Facilities" },
      { type: "Contract", label: "CON-1042 · Annual maintenance" },
      { type: "Work order", label: "WO-3318 · Quarterly HVAC service" },
      { type: "Invoice", label: "INV-2207" },
    ],
  },
  architecture: {
    caption: "Illustrative — multi-tenant architecture",
    description: "three isolated tenants sharing one platform behind a common security and access-control layer",
    tenants: ["Company A", "Company B", "Company C"],
    isolatedData: "Isolated data",
    security: "Tenant isolation · Role-based access · Audit log",
    platform: `${brand.name} platform`,
    modules: ["Customers", "Contracts", "Scheduling", "Work Orders", "Billing", "Collections"],
  },
};

type CropCopy = typeof en;

const ar: CropCopy = {
  listSep: "، ",
  site: "الموقع",
  siteLetters: { A: "أ", B: "ب", C: "ج", D: "د", E: "هـ", F: "و" },
  customer: {
    description: "سجل عميل يضم جهات الاتصال والمواقع والعقود المرتبطة",
    title: "سجل العميل",
    active: "نشط",
    customer: "العميل",
    customerName: "نورث ويند للمرافق",
    primaryContact: "جهة الاتصال الرئيسية",
    operationsManager: "مدير العمليات",
    sites: "المواقع",
    contracts: "العقود",
    activeCount: "نشطة",
    openWorkOrders: "أوامر العمل المفتوحة",
    balanceDue: "الرصيد المستحق",
  },
  contract: {
    description: "لوحة تفاصيل عقد تعرض القيمة والمدة وموعد التجديد والخدمات المشمولة",
    title: "صيانة سنوية",
    renewal: "التجديد خلال 30 يومًا",
    contractValue: "قيمة العقد",
    term: "المدة",
    termValue: "12 شهرًا",
    billing: "الفوترة",
    monthly: "شهرية",
    services: ["صيانة التكييف", "فحص ربع سنوي", "إصلاحات عند الطلب"],
  },
  schedule: {
    description: "تقويم جدولة أسبوعي يجمع بين الزيارات التعاقدية الدورية والأعمال عند الطلب",
    title: "الجدول · هذا الأسبوع",
    chip: "دوري + عند الطلب",
    days: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"],
    events: { hvac: "تكييف", repair: "إصلاح", inspection: "فحص", cleaning: "تنظيف" },
  },
  workOrder: {
    description: "لوحة تفاصيل أمر عمل تعرض الإسناد وقائمة التحقق وحالة الإنجاز",
    title: "خدمة تكييف ربع سنوية",
    inProgress: "قيد التنفيذ",
    site: "الموقع",
    mainBuilding: "المبنى الرئيسي",
    assignedTo: "مُسنَد إلى",
    fieldTeam: "الفريق الميداني 2",
    contract: "العقد",
    steps: ["الوصول إلى الموقع", "اكتمال قائمة التحقق", "إرفاق الصور", "اعتماد العميل"],
  },
  invoice: {
    description: "فاتورة مُنشأة من أوامر عمل مكتملة ضمن عقد",
    issued: "صادرة",
    vat: "ضريبة القيمة المضافة",
    total: "الإجمالي",
  },
  collections: {
    description: "ملخص أعمار الذمم المدينة يعرض الأرصدة الحالية والمتأخرة",
    title: "أعمار الذمم المدينة",
    thisMonth: "هذا الشهر",
    current: "جارية",
    days: "يومًا",
  },
  service: {
    description: "تعريف خدمة ضمن عقد يتضمن التكرار والمدة والموقع والفريق المسند",
    title: "صيانة التكييف",
    active: "نشطة",
    frequency: "التكرار",
    quarterly: "ربع سنوي",
    duration: "المدة",
    durationValue: "3 ساعات",
    location: "الموقع",
    resources: "الموارد",
  },
  evidence: {
    description: "أدلة تنفيذ مرفقة بأمر عمل: صور وملاحظات ومواد وتوقيع العميل",
    title: "أدلة التنفيذ",
    photos: "الصور",
    notes: "ملاحظات الفني",
    notesValue: "تم تغيير الفلاتر واختبار النظام",
    materials: "المواد",
    materialsValue: "2 × فلتر هواء",
    signature: "توقيع العميل",
    captured: "تم التوثيق",
  },
  verification: {
    description: "مشرف يتحقق من أمر عمل مكتمل قبل أن يصبح قابلًا للفوترة",
    title: "التحقق",
    states: ["مكتمل", "تم التحقق", "مُغلق"],
    verifiedBy: "تحقق منه",
    supervisor: "المشرف الميداني",
    billable: "جاهز للفوترة",
  },
  payment: {
    description: "دفعة مسجّلة ومخصّصة لفاتورة",
    title: "دفعة مسجّلة",
    allocated: "مخصّصة",
    method: "طريقة الدفع",
    bankTransfer: "تحويل بنكي",
    reference: "المرجع",
    allocation: "مخصّصة إلى",
    remaining: "المتبقي على الفاتورة",
  },
  report: {
    description: "كتالوج التقارير التشغيلية والمالية مع التصدير بصيغة CSV",
    title: "التقارير",
    export: "تصدير CSV",
    items: ["قائمة العملاء", "العقود النشطة والقريبة من الانتهاء", "حالة أوامر العمل", "أوامر العمل المتأخرة", "الفواتير", "أعمار الذمم المدينة", "المدفوعات"],
  },
  notifications: {
    description: "صندوق إشعارات لعقد مستحق التجديد وفاتورة متأخرة وأمر عمل متأخر",
    title: "الإشعارات",
    unread: "3 غير مقروءة",
    items: [
      { text: "العقد CON-1042 ينتهي خلال 30 يومًا", meta: "التجديد" },
      { text: "الفاتورة INV-2207 متأخرة", meta: "التحصيل" },
      { text: "أمر العمل WO-3325 متأخر", meta: "العمليات" },
    ],
  },
  audit: {
    description: "إدخالات سجل التدقيق تعرض من غيّر أي سجل ومتى",
    title: "سجل التدقيق",
    entries: [
      { actor: "المدير المالي", action: "أصدر الفاتورة INV-2207" },
      { actor: "المشرف الميداني", action: "تحقق من أمر العمل WO-3318" },
      { actor: "مدير الحساب", action: "اعتمد العقد CON-1042" },
    ],
  },
  search: {
    description: "نتائج البحث الشامل لاستعلام واحد عبر العملاء والعقود وأوامر العمل والفواتير",
    query: "نورث ويند",
    results: [
      { type: "عميل", label: "نورث ويند للمرافق" },
      { type: "عقد", label: "CON-1042 · صيانة سنوية" },
      { type: "أمر عمل", label: "WO-3318 · خدمة تكييف ربع سنوية" },
      { type: "فاتورة", label: "INV-2207" },
    ],
  },
  architecture: {
    caption: "توضيحي — بنية متعددة المستأجرين",
    description: "ثلاثة مستأجرين معزولين يتشاركون منصة واحدة خلف طبقة مشتركة للأمان والتحكم في الوصول",
    tenants: ["الشركة أ", "الشركة ب", "الشركة ج"],
    isolatedData: "بيانات معزولة",
    security: "عزل المستأجرين · صلاحيات حسب الدور · سجل التدقيق",
    platform: `منصة ${brand.nameAr}`,
    modules: ["العملاء", "العقود", "الجدولة", "أوامر العمل", "الفوترة", "التحصيل"],
  },
};

const copy: Record<Locale, CropCopy> = { en, ar };

function siteName(t: CropCopy, key: SiteKey) {
  return `${t.site} ${t.siteLetters[key]}`;
}

/** Numbers, amounts and record ids keep LTR order inside RTL text. */
function Ltr({ children }: { children: ReactNode }) {
  return <span className="ltr-number">{children}</span>;
}

function Row({ label, value }: { label: ReactNode; value: ReactNode }) {
  return (
    <div className={styles.row}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={styles.rowValue}>{value}</span>
    </div>
  );
}

export function CustomerCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].customer;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        {t.title} <span className={cx(styles.chip, styles.chipSuccess)}>{t.active}</span>
      </div>
      <div className={styles.split}>
        <div className={styles.card}>
          <div className={styles.rows}>
            <Row label={t.customer} value={t.customerName} />
            <Row label={t.primaryContact} value={t.operationsManager} />
            <Row label={t.sites} value={<Ltr>3</Ltr>} />
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.rows}>
            <Row
              label={t.contracts}
              value={
                <>
                  <Ltr>2</Ltr> {t.activeCount}
                </>
              }
            />
            <Row label={t.openWorkOrders} value={<Ltr>4</Ltr>} />
            <Row label={t.balanceDue} value={<Ltr>SAR 18,400</Ltr>} />
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}

export function ContractCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].contract;
  const c = copy[locale].customer;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        <span>
          <Ltr>CON-1042</Ltr> · {t.title}
        </span>{" "}
        <span className={cx(styles.chip, styles.chipWarning)}>{t.renewal}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.rows}>
          <Row label={c.customer} value={c.customerName} />
          <Row label={t.contractValue} value={<Ltr>SAR 240,000</Ltr>} />
          <Row label={t.term} value={t.termValue} />
          <Row label={t.billing} value={t.monthly} />
        </div>
        <div className={styles.modules}>
          {t.services.map((s) => (
            <span key={s} className={styles.module}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}

const week: Array<{ events: Array<{ kind: EventKind; site: SiteKey; r: boolean }> }> = [
  { events: [{ kind: "hvac", site: "A", r: true }, { kind: "repair", site: "C", r: false }] },
  { events: [{ kind: "inspection", site: "B", r: true }] },
  { events: [{ kind: "hvac", site: "D", r: true }, { kind: "cleaning", site: "A", r: true }, { kind: "repair", site: "E", r: false }] },
  { events: [{ kind: "inspection", site: "F", r: true }] },
  { events: [{ kind: "hvac", site: "B", r: true }, { kind: "repair", site: "A", r: false }] },
];

export function ScheduleCrop({ onAlt, locale = "en" }: CropProps) {
  const all = copy[locale];
  const t = all.schedule;
  const days = week.map((d, i) => ({
    day: t.days[i],
    events: d.events.map((e) => ({ t: `${t.events[e.kind]} · ${siteName(all, e.site)}`, r: e.r })),
  }));
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        {t.title} <span className={styles.chip}>{t.chip}</span>
      </div>
      <div className={styles.calendar}>
        {days.map((d) => (
          <div key={d.day} className={styles.dayHead}>
            {d.day}
          </div>
        ))}
        {days.map((d) => (
          <div key={`${d.day}-col`} className={styles.dayCol}>
            {d.events.map((e) => (
              <div key={e.t} className={cx(styles.event, e.r && styles.eventRecurring)}>
                {e.t}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ProductFrame>
  );
}

export function WorkOrderCrop({ onAlt, locale = "en" }: CropProps) {
  const all = copy[locale];
  const t = all.workOrder;
  const steps = t.steps.map((label, i) => ({ label, done: i < 3 }));
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        <span>
          <Ltr>WO-3318</Ltr> · {t.title}
        </span>{" "}
        <span className={styles.chip}>{t.inProgress}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.rows}>
          <Row label={t.site} value={`${siteName(all, "A")} · ${t.mainBuilding}`} />
          <Row label={t.assignedTo} value={t.fieldTeam} />
          <Row label={t.contract} value={<Ltr>CON-1042</Ltr>} />
        </div>
        <div className={styles.checklist}>
          {steps.map((s) => (
            <div key={s.label} className={styles.checkItem}>
              <span className={cx(styles.box, s.done && styles.boxDone)}>{s.done ? "✓" : ""}</span>
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}

export function InvoiceCrop({ onAlt, locale = "en" }: CropProps) {
  const all = copy[locale];
  const t = all.invoice;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        <Ltr>INV-2207</Ltr> <span className={styles.chip}>{t.issued}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.rows}>
          <Row
            label={
              <>
                <Ltr>WO-3318</Ltr> · {all.workOrder.title}
              </>
            }
            value={<Ltr>SAR 12,000</Ltr>}
          />
          <Row
            label={
              <>
                <Ltr>WO-3325</Ltr> · {all.schedule.events.repair}
                {all.listSep}
                {siteName(all, "C")}
              </>
            }
            value={<Ltr>SAR 3,500</Ltr>}
          />
          <Row label={t.vat} value={<Ltr>SAR 2,325</Ltr>} />
        </div>
        <div className={styles.total}>
          <span>{t.total}</span>
          <span className="ltr-number">SAR 17,825</span>
        </div>
      </div>
    </ProductFrame>
  );
}

export function CollectionsCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].collections;
  const bars = [
    { key: "current", label: t.current, pct: 72, value: "72%", tone: "" },
    {
      key: "1-30",
      label: (
        <>
          <Ltr>1–30</Ltr> {t.days}
        </>
      ),
      pct: 18,
      value: "18%",
      tone: styles.barFillWarn,
    },
    {
      key: "30+",
      label: (
        <>
          <Ltr>30+</Ltr> {t.days}
        </>
      ),
      pct: 10,
      value: "10%",
      tone: styles.barFillDanger,
    },
  ];
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        {t.title} <span className={styles.chip}>{t.thisMonth}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.bars}>
          {bars.map((b) => (
            <div key={b.key} className={styles.bar}>
              <span>{b.label}</span>
              <span className={styles.barTrack}>
                <span className={cx(styles.barFill, b.tone)} style={{ display: "block", width: `${b.pct}%` }} />
              </span>
              <span className="ltr-number">{b.value}</span>
            </div>
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}

export function ServiceCrop({ onAlt, locale = "en" }: CropProps) {
  const all = copy[locale];
  const t = all.service;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        <span>
          <Ltr>SRV-2210</Ltr> · {t.title}
        </span>{" "}
        <span className={cx(styles.chip, styles.chipSuccess)}>{t.active}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.rows}>
          <Row label={all.workOrder.contract} value={<Ltr>CON-1042</Ltr>} />
          <Row label={t.frequency} value={t.quarterly} />
          <Row label={t.duration} value={t.durationValue} />
          <Row label={t.location} value={`${siteName(all, "A")} · ${all.workOrder.mainBuilding}`} />
          <Row label={t.resources} value={all.workOrder.fieldTeam} />
        </div>
      </div>
    </ProductFrame>
  );
}

export function EvidenceCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].evidence;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        <span>
          <Ltr>WO-3318</Ltr> · {t.title}
        </span>
      </div>
      <div className={styles.card}>
        <div className={styles.photos} aria-hidden="true">
          <span className={styles.photo} />
          <span className={styles.photo} />
          <span className={styles.photo} />
        </div>
        <div className={styles.rows}>
          <Row label={t.photos} value={<Ltr>3</Ltr>} />
          <Row label={t.notes} value={t.notesValue} />
          <Row label={t.materials} value={t.materialsValue} />
          <Row label={t.signature} value={<span className={cx(styles.chip, styles.chipSuccess)}>{t.captured}</span>} />
        </div>
      </div>
    </ProductFrame>
  );
}

export function VerificationCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].verification;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        <span>
          <Ltr>WO-3318</Ltr> · {t.title}
        </span>{" "}
        <span className={cx(styles.chip, styles.chipSuccess)}>{t.billable}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.checklist}>
          {t.states.map((state, i) => (
            <div key={state} className={styles.checkItem}>
              <span className={cx(styles.box, i < 2 && styles.boxDone)}>{i < 2 ? "✓" : ""}</span>
              {state}
            </div>
          ))}
        </div>
        <div className={styles.rows}>
          <Row label={t.verifiedBy} value={t.supervisor} />
        </div>
      </div>
    </ProductFrame>
  );
}

export function PaymentCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].payment;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        <span>
          <Ltr>PAY-4410</Ltr> · {t.title}
        </span>{" "}
        <span className={cx(styles.chip, styles.chipSuccess)}>{t.allocated}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.rows}>
          <Row label={t.method} value={t.bankTransfer} />
          <Row label={t.reference} value={<Ltr>TRF-88213</Ltr>} />
          <Row label={t.allocation} value={<Ltr>INV-2207</Ltr>} />
          <Row label={t.remaining} value={<Ltr>SAR 0</Ltr>} />
        </div>
        <div className={styles.total}>
          <span>{copy[locale].invoice.total}</span>
          <span className="ltr-number">SAR 17,825</span>
        </div>
      </div>
    </ProductFrame>
  );
}

export function ReportCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].report;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        {t.title} <span className={styles.chip}>{t.export}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.rows}>
          {t.items.map((item) => (
            <div key={item} className={styles.row}>
              <span className={styles.rowLabel}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}

export function NotificationsCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].notifications;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>
        {t.title} <span className={cx(styles.chip, styles.chipWarning)}>{t.unread}</span>
      </div>
      <div className={styles.card}>
        <div className={styles.rows}>
          {t.items.map((item) => (
            <Row key={item.text} label={item.text} value={<span className={styles.chip}>{item.meta}</span>} />
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}

export function AuditCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].audit;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.panelTitle}>{t.title}</div>
      <div className={styles.card}>
        <div className={styles.rows}>
          {t.entries.map((entry) => (
            <Row key={entry.action} label={entry.actor} value={entry.action} />
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}

export function SearchCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].search;
  return (
    <ProductFrame caption={illustrativeCaptionFor(locale)} description={t.description} onAlt={onAlt}>
      <div className={styles.searchBox}>{t.query}</div>
      <div className={styles.card}>
        <div className={styles.rows}>
          {t.results.map((result) => (
            <Row key={result.label} label={<span className={styles.chip}>{result.type}</span>} value={result.label} />
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}

export function ArchitectureCrop({ onAlt, locale = "en" }: CropProps) {
  const t = copy[locale].architecture;
  return (
    <ProductFrame caption={t.caption} description={t.description} onAlt={onAlt}>
      <div className={styles.arch}>
        <div className={styles.tenants}>
          {t.tenants.map((name) => (
            <div key={name} className={styles.tenant}>
              <div className={styles.tenantName}>{name}</div>
              <div className={styles.tenantMeta}>{t.isolatedData}</div>
            </div>
          ))}
        </div>
        <div className={cx(styles.layer, styles.layerSecurity)}>{t.security}</div>
        <div className={styles.layer}>
          {t.platform}
          <div className={styles.modules}>
            {t.modules.map((m) => (
              <span key={m} className={styles.module}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}
