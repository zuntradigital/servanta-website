import { locale as rootLocale } from "next/root-params";
import { ErrorState } from "@/components/errors/ErrorState";
import { Button } from "@/components/ui/Button";
import { href } from "@/config/routes";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/locales";

/** 404 (spec §6): muted numeral, short message, single way home. */
export default async function NotFound() {
  const value = await rootLocale();
  const locale = value && isLocale(value) ? value : defaultLocale;
  const dict = getDictionary(locale);
  return (
    <ErrorState
      code="404"
      title={dict.errors.notFoundTitle}
      body={dict.errors.notFoundBody}
      actions={<Button href={href(locale, "home")}>{dict.cta.backToHome}</Button>}
    />
  );
}
