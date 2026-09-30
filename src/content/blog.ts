import type { ModuleKey } from "./catalog";
/**
 * Blog posts. No published articles exist yet, so these are SAMPLE posts
 * that demonstrate the listing, featured and article templates. Replace
 * or delete them (and their categories) before launch; nothing else in the
 * codebase depends on specific slugs.
 *
 * Arabic versions (`ar`) are translations of the same samples, drafted for
 * this build; they need review by a native Arabic copy editor.
 *
 * Body blocks are a constrained rich-text subset (spec §9 Rich Text):
 * paragraphs, h2/h3 headings, lists and quotes — never raw HTML.
 */
export type RichBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export type BlogCategory = { slug: string; name: string; nameAr?: string };

type PostTranslation = { title: string; excerpt: string; author?: { name: string; title: string }; body: RichBlock[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: { name: string; title: string };
  publishedAt: string;
  readMinutes: number;
  featured?: boolean;
  /** Media-library image URL; when absent a neutral generated cover is shown. */
  cover?: { src: string; alt: string };
  body: RichBlock[];
  /** Module pages the article leads to (WEB-MKT-SRS-002 §67–68, §115: Article → Module → CTA). */
  relatedModules?: ModuleKey[];
  /** Arabic translation; posts without one are English-only. */
  ar?: PostTranslation;
};

export const blogCategories: BlogCategory[] = [
  { slug: "operations", name: "Operations", nameAr: "العمليات" },
  { slug: "contracts", name: "Contracts", nameAr: "العقود" },
  { slug: "billing", name: "Billing & Collections", nameAr: "الفوترة والتحصيل" },
  { slug: "field-service", name: "Field Service", nameAr: "الخدمة الميدانية" },
];

const author = { name: "Editorial Team", title: "Sample author — replace before launch" };
const authorAr = { name: "فريق التحرير", title: "كاتب تجريبي — يُستبدل قبل الإطلاق" };

export const blogPosts: BlogPost[] = [
  {
    slug: "connecting-contracts-to-daily-operations",
    relatedModules: ["contracts", "scheduling"],
    title: "Connecting contracts to day-to-day service operations",
    excerpt:
      "Why the agreement you sign should drive the work you schedule, the visits you complete, and the invoices you send.",
    category: "contracts",
    author,
    publishedAt: "2026-09-15",
    readMinutes: 6,
    featured: true,
    ar: {
      title: "ربط العقود بعمليات الخدمة اليومية",
      excerpt: "لماذا ينبغي أن يقود العقد الذي توقّعه العملَ الذي تجدوله، والزيارات التي تنجزها، والفواتير التي تصدرها.",
      author: authorAr,
      body: [
        { type: "p", text: "مقال تجريبي. يوضح هذا النص المؤقت طريقة عرض المقالات الطويلة، ويجب استبداله بمحتوى تحريري حقيقي." },
        { type: "p", text: "في كثير من شركات الخدمات، يكون العقد في مكان، والجدول في مكان آخر، والفواتير في مكان ثالث. وكل انتقال بينها فرصة لأن يفوت شيء ما." },
        { type: "h2", text: "ابدأ من الاتفاقية" },
        { type: "p", text: "عندما يحدّد العقد العميلَ والمواقع والخدمات وشروط الفوترة، يمكن لكل خطوة لاحقة أن ترجع إليه بدلًا من إعادة إدخال التفاصيل نفسها." },
        { type: "ul", items: ["خدمات تُجدول من نطاق العقد", "أوامر عمل مرتبطة بالخدمة التي تنفّذها", "فواتير تصدر مقابل عمل منجز وتم التحقق منه"] },
        { type: "h2", text: "اجعل المسار واضحًا" },
        { type: "p", text: "السجل المترابط يعني أن أي شخص يستطيع تتبّع الخط من الفاتورة إلى الزيارة، ومن الزيارة إلى الاتفاقية التي استلزمتها." },
        { type: "quote", text: "يجب أن تجيب كل فاتورة عن السؤال: أي عمل، وبموجب أي اتفاقية؟" },
        { type: "h3", text: "ما الذي تراجعه أولًا" },
        { type: "ol", items: ["أين تُنسخ تفاصيل العقد يدويًا", "أي الزيارات يصعب ربطها بعقد", "كم يستغرق تسوية الفوترة كل شهر"] },
      ],
    },
    body: [
      { type: "p", text: "Sample article. This placeholder text shows how a long-form post is presented and should be replaced with real editorial content." },
      { type: "p", text: "In many service businesses, the contract lives in one place, the schedule in another, and invoices in a third. Each handoff between them is an opportunity for something to be missed." },
      { type: "h2", text: "Start from the agreement" },
      { type: "p", text: "When the contract defines the customer, the sites, the services and the billing terms, every downstream step can reference it instead of re-entering the same details." },
      { type: "ul", items: ["Services scheduled from the contract's scope", "Work orders linked back to the service they fulfil", "Invoices raised against completed, verified work"] },
      { type: "h2", text: "Make the trail visible" },
      { type: "p", text: "A connected record means anyone can follow a line from an invoice back to the visit, and from the visit back to the agreement that required it." },
      { type: "quote", text: "Every invoice should be able to answer the question: which work, under which agreement?" },
      { type: "h3", text: "What to review first" },
      { type: "ol", items: ["Where contract details are copied by hand", "Which visits are hard to trace to a contract", "How long it takes to reconcile billing each month"] },
    ],
  },
  {
    slug: "planning-recurring-and-on-demand-work",
    relatedModules: ["scheduling", "work-orders"],
    title: "Planning recurring and on-demand work in one schedule",
    excerpt: "Keeping planned maintenance and reactive jobs in the same view makes capacity easier to see and commitments easier to keep.",
    category: "operations",
    author,
    publishedAt: "2026-09-08",
    readMinutes: 5,
    ar: {
      title: "تخطيط الأعمال الدورية والأعمال عند الطلب في جدول واحد",
      excerpt: "إبقاء الصيانة المخططة والمهام الطارئة في عرض واحد يجعل رؤية الطاقة الاستيعابية أسهل والوفاء بالالتزامات أيسر.",
      author: authorAr,
      body: [
        { type: "p", text: "مقال تجريبي. استبدل هذا النص المؤقت بمحتوى تحريري حقيقي." },
        { type: "h2", text: "نوعان من العمل، وفريق واحد" },
        { type: "p", text: "الزيارات الدورية معروفة مسبقًا، أما الطلبات عند الحاجة فليست كذلك. وكلاهما يتنافس على الأشخاص والساعات نفسها." },
        { type: "ul", items: ["شاهد العمل المخطط والطارئ جنبًا إلى جنب", "اكتشف التعارضات قبل أن تصل إلى الميدان", "أبقِ التزامات العقود ظاهرة أثناء الاستجابة للطلبات"] },
      ],
    },
    body: [
      { type: "p", text: "Sample article. Replace this placeholder text with real editorial content." },
      { type: "h2", text: "Two kinds of work, one team" },
      { type: "p", text: "Recurring visits are known in advance; on-demand requests are not. Both compete for the same people and the same hours." },
      { type: "ul", items: ["See planned and reactive work side by side", "Spot conflicts before they reach the field", "Keep contract commitments visible while responding to requests"] },
    ],
  },
  {
    slug: "billing-against-verified-work",
    relatedModules: ["billing", "work-orders", "collections"],
    title: "Billing against verified work",
    excerpt: "Tying invoices to completed work orders reduces disputes and shortens the path from job done to payment received.",
    category: "billing",
    author,
    publishedAt: "2026-08-28",
    readMinutes: 4,
    ar: {
      title: "الفوترة مقابل عمل تم التحقق منه",
      excerpt: "ربط الفواتير بأوامر العمل المنجزة يقلّل الخلافات ويختصر الطريق من إنجاز المهمة إلى استلام الدفعة.",
      author: authorAr,
      body: [
        { type: "p", text: "مقال تجريبي. استبدل هذا النص المؤقت بمحتوى تحريري حقيقي." },
        { type: "h2", text: "لماذا يهم التحقق" },
        { type: "p", text: "الفاتورة التي تشير إلى العمل الذي تغطيه أسهل على العميل في اعتمادها، وأسهل على فريقك في شرحها." },
      ],
    },
    body: [
      { type: "p", text: "Sample article. Replace this placeholder text with real editorial content." },
      { type: "h2", text: "Why verification matters" },
      { type: "p", text: "An invoice that references the work it covers is easier for a customer to approve and easier for your team to explain." },
    ],
  },
  {
    slug: "closing-the-loop-in-the-field",
    relatedModules: ["work-orders"],
    title: "Closing the loop in the field",
    excerpt: "What a complete work order record looks like, and why capturing it on site matters for everything that follows.",
    category: "field-service",
    author,
    publishedAt: "2026-08-19",
    readMinutes: 5,
    ar: {
      title: "إغلاق الدائرة في الميدان",
      excerpt: "كيف يبدو سجل أمر العمل المكتمل، ولماذا يهم تسجيله في الموقع لكل ما يأتي بعده.",
      author: authorAr,
      body: [
        { type: "p", text: "مقال تجريبي. استبدل هذا النص المؤقت بمحتوى تحريري حقيقي." },
        { type: "h2", text: "سجّله مرة واحدة، في الموقع" },
        { type: "p", text: "قوائم التحقق والملاحظات والاعتماد المسجلة في موقع العمل تصبح الدليل الذي تعتمد عليه الفوترة والتقارير." },
      ],
    },
    body: [
      { type: "p", text: "Sample article. Replace this placeholder text with real editorial content." },
      { type: "h2", text: "Capture it once, on site" },
      { type: "p", text: "Checklists, notes and sign-off recorded at the point of work become the evidence billing and reporting rely on." },
    ],
  },
  {
    slug: "seeing-what-needs-attention",
    relatedModules: ["command-center", "collections"],
    title: "Seeing what needs attention before it becomes a problem",
    excerpt: "Overdue invoices, expiring contracts and stalled work orders are easier to act on when they surface in one place.",
    category: "operations",
    author,
    publishedAt: "2026-08-05",
    readMinutes: 4,
    ar: {
      title: "رؤية ما يحتاج إلى اهتمام قبل أن يصبح مشكلة",
      excerpt: "الفواتير المتأخرة والعقود التي تقترب من الانتهاء وأوامر العمل المتوقفة أسهل في المعالجة عندما تظهر في مكان واحد.",
      author: authorAr,
      body: [
        { type: "p", text: "مقال تجريبي. استبدل هذا النص المؤقت بمحتوى تحريري حقيقي." },
        { type: "h2", text: "قائمة واحدة للاستثناءات" },
        { type: "p", text: "بدلًا من مراجعة عدة تقارير، تجمع قائمة المتابعة العناصر التي تحتاج إلى قرار اليوم." },
      ],
    },
    body: [
      { type: "p", text: "Sample article. Replace this placeholder text with real editorial content." },
      { type: "h2", text: "One list of exceptions" },
      { type: "p", text: "Instead of checking several reports, an attention list gathers the items that need a decision today." },
    ],
  },
];

/** A post in the requested locale; falls back to English when untranslated. */
export function localizePost(post: BlogPost, locale = "en"): BlogPost {
  if (locale !== "ar" || !post.ar) return post;
  const { ar, ...rest } = post;
  return { ...rest, title: ar.title, excerpt: ar.excerpt, author: ar.author ?? post.author, body: ar.body, ar };
}

export function isPostAvailable(post: BlogPost, locale = "en"): boolean {
  return locale === "en" || (locale === "ar" && Boolean(post.ar));
}

export function getPost(slug: string, locale = "en"): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  return post && isPostAvailable(post, locale) ? localizePost(post, locale) : undefined;
}

export function getCategory(slug: string, locale = "en"): BlogCategory | undefined {
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) return undefined;
  return locale === "ar" && category.nameAr ? { ...category, name: category.nameAr } : category;
}

export function localizedCategories(locale = "en"): BlogCategory[] {
  return blogCategories.map((c) => getCategory(c.slug, locale)!);
}

export function sortedPosts(locale = "en"): BlogPost[] {
  return blogPosts
    .filter((post) => isPostAvailable(post, locale))
    .map((post) => localizePost(post, locale))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function relatedPosts(post: BlogPost, count = 3, locale = "en"): BlogPost[] {
  const others = sortedPosts(locale).filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  return [...sameCategory, ...others.filter((p) => p.category !== post.category)].slice(0, count);
}

export function formatDate(iso: string, locale = "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-nu-latn" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
