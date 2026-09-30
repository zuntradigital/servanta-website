import { moduleHref } from "@/config/routes";
import type { Locale } from "@/i18n/locales";
import { getModules, statusLabels } from "../catalog";
import type { FeatureItem } from "../types";

/**
 * Module cards, derived from the capability catalog (src/content/catalog.ts)
 * so the module list, statuses and links are defined in one place
 * (WEB-MKT-SRS-002 §55, §63, §106). Each card links to its module page.
 */
export function getProductModules(locale: Locale): FeatureItem[] {
  return getModules().map((module) => {
    const copy = module.copy[locale];
    const status = module.status === "COMING_SOON" ? "COMING_SOON" : "AVAILABLE";
    return {
      id: module.key,
      icon: module.icon,
      title: copy.name,
      description: copy.short,
      href: moduleHref(locale, module.key),
      badge: { label: statusLabels[locale][status], tone: status === "AVAILABLE" ? "success" : "warning" },
    };
  });
}
