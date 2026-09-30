/**
 * Visitor cookie consent (16-WEBSITE-ANALYTICS-SRS BR-WEB-031).
 *
 * Stored in a first-party cookie so a future server-rendered tag manager can
 * read it too. Strictly necessary cookies (language preference, this consent
 * record) are always allowed; analytics is opt-in and off until the visitor
 * accepts. PDPL sufficiency of this mechanism is flagged for legal review in
 * the spec and is not claimed here.
 */
export const CONSENT_COOKIE = "servanta_consent";
const CONSENT_VERSION = 1;
const MAX_AGE = 60 * 60 * 24 * 180;
const CHANGE_EVENT = "servanta:consentchange";
const OPEN_EVENT = "servanta:consentopen";

export type ConsentState = { analytics: boolean; decidedAt: string };

let cached: { raw: string; value: ConsentState | null } | undefined;

function readCookie(): string {
  const match = document.cookie.split("; ").find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  return match ? decodeURIComponent(match.slice(CONSENT_COOKIE.length + 1)) : "";
}

/** The stored decision, or null when the visitor hasn't chosen yet. */
export function getConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const raw = readCookie();
  if (cached?.raw === raw) return cached.value;
  let value: ConsentState | null = null;
  try {
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed?.v === CONSENT_VERSION && typeof parsed.analytics === "boolean") {
      value = { analytics: parsed.analytics, decidedAt: String(parsed.decidedAt ?? "") };
    }
  } catch {
    value = null;
  }
  cached = { raw, value };
  return value;
}

export function setConsent(choice: { analytics: boolean }) {
  const record = { v: CONSENT_VERSION, analytics: choice.analytics, decidedAt: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function hasAnalyticsConsent(): boolean {
  return getConsent()?.analytics === true;
}

/** For useSyncExternalStore. */
export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

/** Reopens the preferences dialog (footer "Cookie settings" link). */
export function openConsentPreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeConsentOpen(callback: () => void): () => void {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}
