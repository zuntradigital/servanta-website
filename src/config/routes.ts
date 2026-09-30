import type { Locale } from "@/i18n/locales";

/**
 * Every public route (02-PUBLIC-WEBSITE-SRS route catalog) and the locales
 * each one has content for. A page is only offered in a locale it has been
 * translated into (14-WEBSITE-LOCALIZATION-SRS BR-WEB-036); links to it from
 * another locale fall back to the English page.
 */
export const routes = {
  home: { path: "", locales: ["en", "ar"] },
  about: { path: "/about", locales: ["en", "ar"] },
  platform: { path: "/platform", locales: ["en", "ar"] },
  features: { path: "/features", locales: ["en", "ar"] },
  solutions: { path: "/solutions", locales: ["en", "ar"] },
  services: { path: "/services", locales: ["en", "ar"] },
  pricing: { path: "/pricing", locales: ["en", "ar"] },
  howItWorks: { path: "/how-it-works", locales: ["en", "ar"] },
  security: { path: "/security", locales: ["en", "ar"] },
  resources: { path: "/resources", locales: ["en", "ar"] },
  blog: { path: "/blog", locales: ["en", "ar"] },
  faq: { path: "/faq", locales: ["en", "ar"] },
  contact: { path: "/contact", locales: ["en", "ar"] },
  requestDemo: { path: "/request-demo", locales: ["en", "ar"] },
  contactSales: { path: "/contact-sales", locales: ["en", "ar"] },
  // Legal Center (MOD-LEGAL-CENTER-WEB §5): documents live under /legal/{slug}.
  // Other catalog documents are served by the /legal/[document] route (legalHref).
  legal: { path: "/legal", locales: ["en", "ar"] },
  legalContact: { path: "/legal/contact", locales: ["en", "ar"] },
  privacy: { path: "/legal/privacy", locales: ["en", "ar"] },
  terms: { path: "/legal/terms", locales: ["en", "ar"] },
  cookies: { path: "/legal/cookies", locales: ["en", "ar"] },
  refundPolicy: { path: "/legal/refunds-cancellation", locales: ["en", "ar"] },
} as const satisfies Record<string, { path: string; locales: readonly Locale[] }>;

export type RouteKey = keyof typeof routes;

export function isRouteAvailable(key: RouteKey, locale: Locale): boolean {
  return (routes[key].locales as readonly Locale[]).includes(locale);
}

/** Localised href for a route, falling back to English when untranslated. */
export function href(locale: Locale, key: RouteKey, hash?: string): string {
  const target = isRouteAvailable(key, locale) ? locale : "en";
  const path = `/${target}${routes[key].path}`;
  return hash ? `${path}#${hash}` : path;
}

/** The Contact Sales form (WEB-MKT-SRS-002 §101 route strategy). */
export function salesHref(locale: Locale): string {
  return href(locale, "contactSales");
}

/** A Legal Center document page, e.g. /en/legal/subscription. */
export function legalHref(locale: Locale, slug: string): string {
  return `${href(locale, "legal")}/${slug}`;
}

/** Module pages live under Features (WEB-MKT-SRS-002 §101–103), e.g. /en/features/contracts. */
export function moduleHref(locale: Locale, moduleKey: string, hash?: string): string {
  return `${href(locale, "features")}/${moduleKey}${hash ? `#${hash}` : ""}`;
}

export function blogPostHref(locale: Locale, slug: string): string {
  return `${href(locale, "blog")}/${slug}`;
}

/** Resolves a pathname (without locale prefix) back to its route key. */
export function routeKeyForPath(pathWithoutLocale: string): RouteKey | undefined {
  const normalized = pathWithoutLocale.replace(/\/$/, "");
  return (Object.keys(routes) as RouteKey[]).find((key) => routes[key].path === normalized);
}

/** Returns the locale-less pathname and the locale segment. */
export function splitLocale(pathname: string): { locale: string; rest: string } {
  const [, locale = "", ...rest] = pathname.split("/");
  return { locale, rest: rest.length ? `/${rest.join("/")}` : "" };
}
