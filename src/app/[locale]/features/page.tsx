import type { Metadata } from "next";
import { TrackEvent } from "@/components/analytics/TrackEvent";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ImageText } from "@/components/sections/ImageText";
import { PageIntro } from "@/components/sections/PageIntro";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TextLink } from "@/components/ui/TextLink";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ContractCrop, InvoiceCrop, WorkOrderCrop } from "@/components/visuals/UiCrops";
import { href, legalHref, moduleHref } from "@/config/routes";
import { capabilities } from "@/content/catalog";
import { legalCatalog } from "@/content/pages/legal";
import { getModulePageLabels } from "@/content/pages/module-page";
import { faqsByQuestion } from "@/content/pages/faq";
import { getFeaturesContent } from "@/content/pages/features";
import { closingCta } from "@/content/shared";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./features.module.css";

const eTransactions = legalCatalog.find((doc) => doc.key === "electronic_transactions_notice")!;

export async function generateMetadata({ params }: PageProps<"/[locale]/features">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const { meta } = getFeaturesContent(locale);
  return pageMetadata({
    locale,
    route: "features",
    title: meta.title,
    description: meta.description,
  });
}

export default async function FeaturesPage({ params }: PageProps<"/[locale]/features">) {
  const locale = await resolveLocale(params, "features");
  const dict = getDictionary(locale);
  const content = getFeaturesContent(locale);
  const labels = getModulePageLabels(locale);
  const comingSoon = capabilities.filter((item) => item.status === "COMING_SOON");
  const faqs = faqsByQuestion(
    [
      "Can I manage recurring and one-time services together?",
      "How do invoices relate to the work we deliver?",
      "Can field teams record work on site?",
    ],
    locale,
  );

  return (
    <>
      <PageIntro
        title={content.intro.title}
        subtitle={content.intro.subtitle}
        actions={
          <>
            <Button href={href(locale, "pricing")}>{dict.cta.seePricing}</Button>
            <Button href={href(locale, "requestDemo")} variant="secondary">
              {dict.cta.requestDemo}
            </Button>
          </>
        }
      />

      <Section labelledBy="modules-heading">
        <Container>
          <SectionIntro headingId="modules-heading" heading={content.modules.heading} subheading={content.modules.subheading} />
          <FeatureGrid items={content.modules.items} columns={3} surface="surface" moreLabel={dict.cta.learnMore} />
        </Container>
      </Section>

      {comingSoon.length > 0 && (
        <Section tone="alt" density="dense" ariaLabel={labels.comingSoonBody}>
          <Container width="narrow">
            <SectionIntro subheading={labels.comingSoonBody} />
            <ul role="list" className={styles.soonList}>
              {comingSoon.map((item) => (
                <li key={item.key} className={styles.soonItem}>
                  {item.link && "module" in item.link ? (
                    <TextLink href={moduleHref(locale, item.link.module, item.link.hash)}>{item.name[locale]}</TextLink>
                  ) : (
                    <span>{item.name[locale]}</span>
                  )}
                  <StatusBadge status={item.status} locale={locale} />
                </li>
              ))}
            </ul>
            <p className={styles.legalNote}>
              <TextLink href={legalHref(locale, eTransactions.slug)}>{eTransactions.title[locale]}</TextLink>
            </p>
          </Container>
        </Section>
      )}

      <ImageText
        id="contract-lifecycle"
        tone="alt"
        eyebrow={content.contractLifecycle.eyebrow}
        heading={content.contractLifecycle.heading}
        paragraphs={content.contractLifecycle.paragraphs}
        bullets={content.contractLifecycle.bullets}
        visual={<ContractCrop onAlt locale={locale} />}
        visualPosition="end"
      />

      <ImageText
        id="field-operations"
        eyebrow={content.fieldOperations.eyebrow}
        heading={content.fieldOperations.heading}
        paragraphs={content.fieldOperations.paragraphs}
        bullets={content.fieldOperations.bullets}
        visual={<WorkOrderCrop locale={locale} />}
        visualPosition="start"
      />

      <ImageText
        id="financial-operations"
        tone="alt"
        eyebrow={content.financialOperations.eyebrow}
        heading={content.financialOperations.heading}
        paragraphs={content.financialOperations.paragraphs}
        bullets={content.financialOperations.bullets}
        visual={<InvoiceCrop onAlt locale={locale} />}
        visualPosition="end"
      />

      <Section density="dense" labelledBy="features-faq-heading">
        <Container width="narrow">
          <SectionIntro headingId="features-faq-heading" heading={content.faq.heading} />
          <FaqAccordion items={faqs} />
        </Container>
      </Section>
      <FaqJsonLd items={faqs} />

      <TrackEvent event="feature_view" params={{ content_id: "features", locale }} />
      <CtaBand heading={closingCta(locale).heading} primary={{ label: dict.cta.seePricing, href: href(locale, "pricing") }} secondary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }} />
    </>
  );
}
