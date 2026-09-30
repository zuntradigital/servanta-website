import type { Locale } from "@/i18n/locales";
import type { BannerTone } from "@/components/sections/Banner";

/**
 * Site-wide Announcement (spec §9), the `website_announcements` singleton.
 * Set to null to show nothing (the default: no announcement exists).
 * CMS-DEPENDENT: the spec manages this from the admin dashboard.
 *
 * Example:
 * { id: "2026-launch", tone: "info", dismissible: true,
 *   message: { en: "…", ar: "…" }, link: { label: { en: "…", ar: "…" }, route: "platform" } }
 */
export type Announcement = {
  id: string;
  tone: BannerTone;
  dismissible: boolean;
  message: Record<Locale, string>;
  link?: { label: Record<Locale, string>; href: Record<Locale, string> };
};

export const announcement = null as Announcement | null;
