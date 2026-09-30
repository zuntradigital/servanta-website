import type { Metadata } from "next";
import { FileSignature, FileText, Mail, ShieldCheck, type LucideIcon } from "lucide-react";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageIntro } from "@/components/sections/PageIntro";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { href, legalHref } from "@/config/routes";
import { formatDate } from "@/content/blog";
import {
  isLegalPublished,
  legalCategoryOrder,
  legalCenterContent,
  legalLabels,
  publicLegalDocuments,
  type LegalCategory,
} from "@/content/pages/legal";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./legal.module.css";

const categoryIcons: Record<LegalCategory, LucideIcon> = {
  platform: FileText,
  privacy: ShieldCheck,
  contracts: FileSignature,
  contact: Mail,
};

export async function generateMetadata({ params }: PageProps<"/[locale]/legal">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const content = legalCenterContent[locale];
  return pageMetadata({ locale, route: "legal", title: content.title, description: content.metaDescription });
}

/**
 * Legal Center landing (MOD-LEGAL-CENTER-WEB §6): current public documents by
 * category, each with its status, version and effective date once published.
 */
export default async function LegalCenterPage({ params }: PageProps<"/[locale]/legal">) {
  const locale = await resolveLocale(params, "legal");
  const content = legalCenterContent[locale];
  const labels = legalLabels[locale];
  const documents = publicLegalDocuments().filter((doc) => doc.key !== "legal_contact");

  return (
    <>
      <PageIntro title={content.title} subtitle={content.intro} />

      <Section density="dense">
        <Container width="narrow" className={styles.notices}>
          <Alert tone="info">{content.effectiveDatesNote}</Alert>
          <Alert tone="info">{content.userDocumentsNote}</Alert>
        </Container>
      </Section>

      {legalCategoryOrder
        .filter((category) => category !== "contact")
        .map((category, index) => {
          const items = documents
            .filter((doc) => doc.category === category)
            .map((doc) => {
              const published = isLegalPublished(doc);
              return {
                id: doc.slug,
                icon: categoryIcons[category],
                title: doc.title[locale],
                description: doc.description[locale],
                href: legalHref(locale, doc.slug),
                badge: published
                  ? { label: `${labels.version} ${doc.version} · ${formatDate(doc.effectiveFrom!, locale)}`, tone: "success" as const }
                  : { label: labels.pendingBadge, tone: "warning" as const },
              };
            });
          if (!items.length) return null;
          return (
            <Section key={category} tone={index % 2 === 0 ? "alt" : "surface"} labelledBy={`legal-${category}-heading`}>
              <Container>
                <SectionIntro headingId={`legal-${category}-heading`} heading={content.categories[category]} />
                <FeatureGrid items={items} surface={index % 2 === 0 ? "alt" : "surface"} />
              </Container>
            </Section>
          );
        })}

      <Section density="dense" labelledBy="legal-contact-heading">
        <Container width="narrow" className={styles.contact}>
          <SectionIntro headingId="legal-contact-heading" heading={content.contactHeading} subheading={content.contactBody} />
          <Button href={href(locale, "legalContact")} arrow>
            {content.contactLink}
          </Button>
        </Container>
      </Section>
    </>
  );
}
