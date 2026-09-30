import { Banner } from "@/components/sections/Banner";
import { announcement } from "@/config/announcement";
import type { Locale } from "@/i18n/locales";

/** Renders the configured site-wide announcement above the header, if any. */
export function AnnouncementBar({ locale, dismissLabel }: { locale: Locale; dismissLabel: string }) {
  if (!announcement) return null;
  const { id, tone, dismissible, message, link } = announcement;
  return (
    <Banner
      id={id}
      tone={tone}
      dismissible={dismissible}
      dismissLabel={dismissLabel}
      message={message[locale]}
      link={link ? { label: link.label[locale], href: link.href[locale] } : undefined}
    />
  );
}
