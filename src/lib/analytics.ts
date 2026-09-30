import { hasAnalyticsConsent } from "@/lib/consent";

/**
 * Analytics event hooks (WEB-MKT-SRS-002 §84–86; 16-WEBSITE-ANALYTICS-SRS §3).
 *
 * No provider is named or loaded (BR-WEB-028). Events are only emitted after
 * the visitor has accepted analytics cookies, and then they go to whichever
 * adapters are registered with `registerAnalyticsAdapter`. Until a provider is
 * chosen none are, so nothing leaves the browser.
 *
 * BACKEND/PROVIDER-DEPENDENT: once a provider is selected, register one
 * adapter (e.g. in a client component mounted by the layout) that forwards
 * `(name, params)` to it, and load its script only when `hasAnalyticsConsent()`.
 *
 * `download_asset` (§84) has no trigger yet: the site offers no downloadable assets.
 */
export type AnalyticsEvent =
  | "page_view"
  | "navigation_click"
  | "cta_click"
  | "hero_cta_click"
  | "feature_view"
  | "module_view"
  | "pricing_view"
  | "pricing_plan_cta"
  | "request_demo_start"
  | "request_demo_submit"
  | "contact_sales_start"
  | "contact_sales_submit"
  | "contact_form_submit"
  | "faq_expand"
  | "blog_article_view"
  | "blog_cta_click"
  | "language_switch"
  | "download_asset";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;
export type AnalyticsAdapter = (event: AnalyticsEvent, params: AnalyticsParams) => void;

const adapters = new Set<AnalyticsAdapter>();

export function registerAnalyticsAdapter(adapter: AnalyticsAdapter): () => void {
  adapters.add(adapter);
  return () => adapters.delete(adapter);
}

const SESSION_ID = "servanta_sid";
const ANONYMOUS_ID = "servanta_aid";

function randomId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function storedId(storage: Storage, key: string): string | undefined {
  try {
    let value = storage.getItem(key);
    if (!value) {
      value = randomId();
      storage.setItem(key, value);
    }
    return value;
  } catch {
    return undefined;
  }
}

/** Removes the analytics identifiers when consent is withdrawn. */
export function clearAnalyticsIds() {
  try {
    localStorage.removeItem(ANONYMOUS_ID);
    sessionStorage.removeItem(SESSION_ID);
  } catch {
    // Storage unavailable: nothing was stored.
  }
}

/**
 * Event standard (§85): every event carries timestamp, page, locale,
 * session_id, anonymous_id, source and campaign, plus its own content_id /
 * module_id / feature_id / cta_id. Identifiers are only created after consent
 * (track() returns early otherwise). Never pass form values or other personal data.
 */
export function track(event: AnalyticsEvent, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || !hasAnalyticsConsent()) return;
  const touch = campaignParams();
  const payload: AnalyticsParams = {
    event_name: event,
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    locale: document.documentElement.lang || undefined,
    session_id: storedId(sessionStorage, SESSION_ID),
    anonymous_id: storedId(localStorage, ANONYMOUS_ID),
    source: touch.utm_source ?? touch.referrer,
    campaign: touch.utm_campaign,
    ...params,
  };
  if (process.env.NODE_ENV === "development") console.debug("[analytics]", event, payload);
  for (const adapter of adapters) {
    try {
      adapter(event, payload);
    } catch {
      // A failing provider must never break the page.
    }
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const LAST_TOUCH = "servanta_utm";
const FIRST_TOUCH = "servanta_first_touch";
const LANDING_PAGE = "servanta_landing";
const REFERRER = "servanta_referrer";

/**
 * Lead attribution (§65) for this browser session: landing page, external
 * referrer, first touch (never overwritten) and last touch (latest campaign).
 * Kept in sessionStorage only, so nothing persists beyond the visit.
 */
export function captureCampaignParams() {
  if (typeof window === "undefined") return;
  const search = new URLSearchParams(window.location.search);
  const found = Object.fromEntries(UTM_KEYS.filter((key) => search.get(key)).map((key) => [key, search.get(key) as string]));
  try {
    if (!sessionStorage.getItem(LANDING_PAGE)) sessionStorage.setItem(LANDING_PAGE, window.location.pathname);
    if (Object.keys(found).length) {
      sessionStorage.setItem(LAST_TOUCH, JSON.stringify(found));
      if (!sessionStorage.getItem(FIRST_TOUCH)) sessionStorage.setItem(FIRST_TOUCH, JSON.stringify(found));
    }
    if (document.referrer && !sessionStorage.getItem(REFERRER)) {
      const referrer = new URL(document.referrer);
      if (referrer.host !== window.location.host) sessionStorage.setItem(REFERRER, referrer.origin);
    }
  } catch {
    // Storage can be unavailable (private mode); attribution is best-effort.
  }
}

function touchLabel(raw: string | null): string | undefined {
  if (!raw) return undefined;
  const utm = JSON.parse(raw) as Record<string, string>;
  return [utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean).join(" / ") || undefined;
}

/** Attribution sent with form submissions and used as event source/campaign. */
export function campaignParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const utm = JSON.parse(sessionStorage.getItem(LAST_TOUCH) ?? "{}") as Record<string, string>;
    const extra: Record<string, string | undefined> = {
      referrer: sessionStorage.getItem(REFERRER) ?? undefined,
      landing_page: sessionStorage.getItem(LANDING_PAGE) ?? undefined,
      first_touch: touchLabel(sessionStorage.getItem(FIRST_TOUCH)),
      last_touch: touchLabel(sessionStorage.getItem(LAST_TOUCH)),
    };
    return { ...utm, ...Object.fromEntries(Object.entries(extra).filter((entry): entry is [string, string] => Boolean(entry[1]))) };
  } catch {
    return {};
  }
}
