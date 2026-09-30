"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { isRouteAvailable, routeKeyForPath, splitLocale } from "@/config/routes";
import { isLocale, localeNames, locales, type Locale } from "@/i18n/locales";
import { cx } from "@/lib/cx";
import styles from "./LanguageSwitcher.module.css";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  variant?: "header" | "drawer";
  onNavigate?: () => void;
};

/** Target URL for the same page in another locale, or null if untranslated. */
export function useAlternateHref(locale: Locale): { locale: Locale; href: string } | null {
  const pathname = usePathname() ?? "/";
  const { rest } = splitLocale(pathname);
  const other = locales.find((l) => l !== locale);
  if (!other || !isLocale(other)) return null;

  // Blog articles share the blog route's locales; every sample post exists in both.
  const key = rest.startsWith("/blog/") ? "blog" : routeKeyForPath(rest);
  // Only offer a locale the page actually exists in (BR-WEB-036).
  if (!key || !isRouteAvailable(key, other)) return null;
  return { locale: other, href: `/${other}${rest}` };
}

export function LanguageSwitcher({ locale, label, variant = "header", onNavigate }: LanguageSwitcherProps) {
  const alternate = useAlternateHref(locale);
  if (!alternate) return null;

  return (
    <Link
      href={alternate.href}
      hrefLang={alternate.locale}
      lang={alternate.locale}
      className={cx(styles.switcher, variant === "drawer" && styles.drawer)}
      aria-label={`${label}: ${localeNames[alternate.locale]}`}
      onClick={() => {
        // Record the explicit choice right away so "/" honours it (FR-WEB-026).
        document.cookie = `NEXT_LOCALE=${alternate.locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
        onNavigate?.();
      }}
    >
      <Globe size={16} strokeWidth={1.75} aria-hidden="true" />
      <span>{localeNames[alternate.locale]}</span>
    </Link>
  );
}
