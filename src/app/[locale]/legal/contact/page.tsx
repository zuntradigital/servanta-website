import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { href } from "@/config/routes";
import { getForms } from "@/content/pages/forms";
import { legalCatalog, legalLabels } from "@/content/pages/legal";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./legal-contact.module.css";

const entry = legalCatalog.find((doc) => doc.key === "legal_contact")!;

export async function generateMetadata({ params }: PageProps<"/[locale]/legal/contact">): Promise<Metadata> {
  const locale = await metaLocale(params);
  return pageMetadata({ locale, route: "legalContact", title: entry.title[locale], description: entry.description[locale] });
}

/**
 * Legal & privacy request form (MOD-LEGAL-CENTER-WEB §20, §37). Submissions go
 * through the existing forms endpoint as `legal_request`; response procedures and
 * deadlines are for counsel to define and are not stated here.
 */
export default async function LegalContactPage({ params }: PageProps<"/[locale]/legal/contact">) {
  const locale = await resolveLocale(params, "legalContact");
  const form = getForms(locale).legal;

  return (
    <>
      <PageIntro title={entry.title[locale]} subtitle={entry.description[locale]} />
      <Section tone="alt" density="dense" ariaLabel={entry.title[locale]}>
        <Container width="narrow">
          <div className={styles.card}>
            <LeadForm formKey="legal_request" fields={form.fields} messages={form.messages} privacyHref={href(locale, "privacy")} locale={locale} />
          </div>
          <p className={styles.back}>
            <Link href={href(locale, "legal")}>{legalLabels[locale].allDocuments}</Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
