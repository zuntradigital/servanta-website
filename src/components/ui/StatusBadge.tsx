import { statusLabels, type CapabilityStatus } from "@/content/catalog";
import type { Locale } from "@/i18n/locales";
import { Badge } from "./Badge";

/**
 * Capability status (WEB-MKT-SRS-002 §6, §56.5). Only published statuses
 * render; anything else returns nothing because it must never reach a page.
 */
export function StatusBadge({ status, locale, className }: { status: CapabilityStatus; locale: Locale; className?: string }) {
  // Only AVAILABLE shows a status badge; the coming-soon label is not displayed.
  if (status !== "AVAILABLE") return null;
  return (
    <Badge tone="success" className={className}>
      {statusLabels[locale].AVAILABLE}
    </Badge>
  );
}
