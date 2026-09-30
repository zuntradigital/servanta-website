import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/locales";

export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Explicit choice (cookie) wins; otherwise Accept-Language; otherwise default. */
function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = ranked.find(({ lang }) => isLocale(lang));
  return match && isLocale(match.lang) ? match.lang : defaultLocale;
}

/**
 * Only a real page visit records the locale. Router prefetches and RSC
 * fetches are not visits: /ar pages prefetch the /en links they contain,
 * which used to overwrite an Arabic visitor's cookie with "en" (audit
 * Partial #9). Next strips its router headers before the proxy runs, so the
 * browser's Sec-Fetch-Dest decides; in-app language switches set the cookie
 * client-side (LanguageSwitcher).
 */
function isPageVisit(request: NextRequest): boolean {
  const { headers } = request;
  const purpose = `${headers.get("purpose") ?? ""} ${headers.get("sec-purpose") ?? ""}`;
  if (purpose.includes("prefetch")) return false;
  if (headers.has("rsc") || headers.has("next-router-prefetch") || request.nextUrl.searchParams.has("_rsc")) return false;
  const dest = headers.get("sec-fetch-dest");
  return dest === null || dest === "document";
}

/**
 * Locale routing (14-WEBSITE-LOCALIZATION-SRS FR-WEB-026): every public URL is
 * /en/... or /ar/...; unprefixed requests redirect to the preferred locale.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1] ?? "";

  if (isLocale(segment)) {
    const response = NextResponse.next();
    // Remember an explicit locale visit so the root redirect honours it.
    if (isPageVisit(request) && request.cookies.get(LOCALE_COOKIE)?.value !== segment) {
      response.cookies.set(LOCALE_COOKIE, segment, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    }
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
