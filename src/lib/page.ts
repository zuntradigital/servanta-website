import { notFound } from "next/navigation";
import { isRouteAvailable, type RouteKey } from "@/config/routes";
import { isLocale, type Locale } from "@/i18n/locales";

/**
 * Resolves the locale for a page and 404s when the page has no translation
 * in that locale (BR-WEB-036: never serve English content under /ar).
 */
export async function resolveLocale(params: Promise<{ locale: string }>, route: RouteKey): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale) || !isRouteAvailable(route, locale)) notFound();
  return locale;
}

export async function metaLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  return isLocale(locale) ? locale : "en";
}
