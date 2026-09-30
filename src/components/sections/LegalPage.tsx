import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { href } from "@/config/routes";
import { formatDate } from "@/content/blog";
import { legalLabels, type LegalDoc } from "@/content/pages/legal";
import type { Locale } from "@/i18n/locales";
import { RichText } from "./RichText";
import styles from "./LegalPage.module.css";

/**
 * Legal container (spec §6): title, narrow body, no CTA. A published document
 * shows its version, effective date and last update (MOD-LEGAL-CENTER-WEB
 * AC-LC-003); one still in legal review shows the pending notice instead.
 */
export function LegalPage({ doc, locale = "en" }: { doc: LegalDoc; locale?: Locale }) {
  const labels = legalLabels[locale];
  const published = Boolean(doc.version && doc.effectiveFrom);
  return (
    <article className={styles.page} aria-labelledby="page-title">
      <Container width="reading">
        <h1 id="page-title" className={styles.title}>
          {doc.title}
        </h1>
        {published && (
          <p className={styles.updated}>
            {labels.version} <span className="ltr-number">{doc.version}</span> · {labels.effective}{" "}
            <time dateTime={doc.effectiveFrom!}>{formatDate(doc.effectiveFrom!, locale)}</time>
            {doc.lastUpdated && (
              <>
                {" "}
                · {labels.lastUpdated} <time dateTime={doc.lastUpdated}>{formatDate(doc.lastUpdated, locale)}</time>
              </>
            )}
          </p>
        )}
        <RichText blocks={doc.body}>
          {!published && (
            <p>
              {labels.contactPrefix} <Link href={href(locale, "legalContact")}>{labels.contactLink}</Link>.
            </p>
          )}
          <p>
            <Link href={href(locale, "legal")}>{labels.allDocuments}</Link>
          </p>
        </RichText>
      </Container>
    </article>
  );
}
