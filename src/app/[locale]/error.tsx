"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ErrorState } from "@/components/errors/ErrorState";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/i18n/dictionaries";
import { defaultLocale, isLocale } from "@/i18n/locales";

/** 500-class error boundary: no data dependency, renders from static strings. */
export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const segment = usePathname()?.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      code="500"
      title={dict.errors.serverErrorTitle}
      body={dict.errors.serverErrorBody}
      actions={
        <>
          <Button onClick={() => retry()}>{dict.errors.tryAgain}</Button>
          <Button href={`/${locale}`} variant="secondary">
            {dict.cta.backToHome}
          </Button>
        </>
      }
    />
  );
}
