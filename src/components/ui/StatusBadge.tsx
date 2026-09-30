import { statusLabels, type CapabilityStatus } from "@/content/catalog";
import type { Locale } from "@/i18n/locales";
import { Badge } from "./Badge";

/**
 * Capability status (WEB-MKT-SRS-002 §6, §56.5). Only published statuses
 * render; anything else returns nothing because it must never reach a page.
 */
export function StatusBadge({ status, locale, className }: { status: CapabilityStatus; locale: Locale; className?: string }) {
  if (status !== "AVAILABLE" && status !== "COMING_SOON") return null;
  return (
    <Badge tone={status === "AVAILABLE" ? "success" : "warning"} className={className}>
      {statusLabels[locale][status]}
    </Badge>
  );
}
