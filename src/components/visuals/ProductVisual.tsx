import type { VisualKey } from "@/content/catalog";
import { getHomeContent } from "@/content/home";
import type { Locale } from "@/i18n/locales";
import { CommandCenterVisual } from "./CommandCenterVisual";
import {
  AuditCrop,
  CollectionsCrop,
  ContractCrop,
  CustomerCrop,
  EvidenceCrop,
  InvoiceCrop,
  NotificationsCrop,
  PaymentCrop,
  ReportCrop,
  ScheduleCrop,
  SearchCrop,
  ServiceCrop,
  VerificationCrop,
  WorkOrderCrop,
} from "./UiCrops";

/** Product visual library lookup (WEB-MKT-SRS-002 §57): one illustrative visual per catalog key. */
export function ProductVisual({ visual, locale, onAlt }: { visual: VisualKey; locale: Locale; onAlt?: boolean }) {
  switch (visual) {
    case "customer":
      return <CustomerCrop locale={locale} onAlt={onAlt} />;
    case "contract":
      return <ContractCrop locale={locale} onAlt={onAlt} />;
    case "schedule":
      return <ScheduleCrop locale={locale} onAlt={onAlt} />;
    case "workOrder":
      return <WorkOrderCrop locale={locale} onAlt={onAlt} />;
    case "invoice":
      return <InvoiceCrop locale={locale} onAlt={onAlt} />;
    case "payment":
      return <PaymentCrop locale={locale} onAlt={onAlt} />;
    case "collections":
      return <CollectionsCrop locale={locale} onAlt={onAlt} />;
    case "commandCenter":
      return <CommandCenterVisual content={getHomeContent(locale).hero.visual} />;
    case "report":
      return <ReportCrop locale={locale} onAlt={onAlt} />;
    case "notifications":
      return <NotificationsCrop locale={locale} onAlt={onAlt} />;
    case "audit":
      return <AuditCrop locale={locale} onAlt={onAlt} />;
    case "search":
      return <SearchCrop locale={locale} onAlt={onAlt} />;
    case "service":
      return <ServiceCrop locale={locale} onAlt={onAlt} />;
    case "evidence":
      return <EvidenceCrop locale={locale} onAlt={onAlt} />;
    case "verification":
      return <VerificationCrop locale={locale} onAlt={onAlt} />;
  }
}
