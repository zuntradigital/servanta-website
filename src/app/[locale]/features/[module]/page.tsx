import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackEvent } from "@/components/analytics/TrackEvent";
import { ConnectedSystem } from "@/components/sections/ConnectedSystem";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ImageText } from "@/components/sections/ImageText";
import { PageIntro } from "@/components/sections/PageIntro";
import { Customer360, DashboardQuestions, JourneyChain } from "@/components/sections/ProductStory";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TextLink } from "@/components/ui/TextLink";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { href, legalHref, moduleHref } from "@/config/routes";
import { comingSoonFor, customer360, getModule, getModules, groupLabels } from "@/content/catalog";
import { journey } from "@/content/journey";
import { faqsByQuestion } from "@/content/pages/faq";
import { legalCatalog } from "@/content/pages/legal";
import { getModulePageLabels } from "@/content/pages/module-page";
import { getProductModules } from "@/content/pages/modules";
import { getDictionary } from "@/i18n/dictionaries";
import { locales } from "@/i18n/locales";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./module.module.css";

type Props = PageProps<"/[locale]/features/[module]">;

const eTransactions = legalCatalog.find((doc) => doc.key === "electronic_transactions_notice")!;

export function generateStaticParams() {
  return locales.flatMap((locale) => getModules().map((module) => ({ locale, module: module.key })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await metaLocale(params);
  const record = getModule((await params).module);
  if (!record) return {};
  const copy = record.copy[locale];
  return pageMetadata({ locale, route: "features", path: `/features/${record.key}`, title: copy.seoTitle, description: copy.seoDescription });
}

/** Module page template (WEB-MKT-SRS-002 §102–103), rendered from the module record. */
export default async function ModulePage({ params }: Props) {
  const locale = await resolveLocale(params, "features");
  const record = getModule((await params).module);
  if (!record) notFound();

  const dict = getDictionary(locale);
  const labels = getModulePageLabels(locale);
  const copy = record.copy[locale];
  const comingSoon = comingSoonFor(record.key);
  const related = getProductModules(locale).filter((item) => record.relatedModules.includes(item.id as (typeof record.relatedModules)[number]));
  const faqs = record.faqQuestions ? faqsByQuestion(record.faqQuestions, locale) : [];
  const stage = journey.find((s) => s.module === record.key && s.inChain);

  return (
    <>
      <Container className={styles.crumbs}>
        <Breadcrumbs
          label={labels.breadcrumbs}
          items={[
            { label: labels.home, href: href(locale, "home") },
            { label: labels.features, href: href(locale, "features") },
            { label: copy.name, href: moduleHref(locale, record.key) },
          ]}
        />
      </Container>

      <PageIntro
        eyebrow={groupLabels[locale][record.category]}
        title={copy.name}
        subtitle={copy.short}
        meta={<StatusBadge status={record.status} locale={locale} />}
        actions={
          <>
            <Button href={href(locale, "requestDemo")} arrow>
              {dict.cta.requestDemo}
            </Button>
            <Button href={href(locale, "contactSales")} variant="secondary">
              {dict.cta.contactSales}
            </Button>
          </>
        }
      />

      <ImageText
        id="capabilities"
        tone="alt"
        heading={labels.capabilitiesHeading}
        paragraphs={[copy.value]}
        bullets={copy.capabilities}
        visual={<ProductVisual visual={record.visual} locale={locale} onAlt />}
        visualPosition="end"
      />

      {record.key === "customer-management" && (
        <Section id="customer-360" labelledBy="customer-360-heading">
          <Container width="narrow">
            <SectionIntro headingId="customer-360-heading" heading={customer360[locale].heading} subheading={customer360[locale].subheading} />
            <Customer360 locale={locale} />
          </Container>
        </Section>
      )}

      {record.key === "command-center" && (
        <Section id="dashboard" labelledBy="dashboard-heading">
          <Container>
            <SectionIntro headingId="dashboard-heading" heading={labels.dashboardHeading} subheading={labels.dashboardSubheading} />
            <DashboardQuestions locale={locale} />
          </Container>
        </Section>
      )}

      {record.workflow && (
        <Section labelledBy="workflow-heading" density="dense">
          <Container>
            <SectionIntro headingId="workflow-heading" heading={labels.workflowHeading} subheading={labels.workflowSubheading} />
            <ConnectedSystem
              label={labels.workflowHeading}
              nodes={record.workflow[locale].map((state, index) => ({ key: `${record.key}-${index}`, label: state }))}
            />
          </Container>
        </Section>
      )}

      {comingSoon.length > 0 && (
        <Section id="coming-soon" tone="alt" ariaLabel={labels.comingSoonBody} density="dense">
          <Container width="narrow">
            <SectionIntro subheading={labels.comingSoonBody} />
            <ul role="list" className={styles.soonList}>
              {comingSoon.map((item) => (
                <li key={item.key} className={styles.soonItem}>
                  <span>{item.name[locale]}</span>
                  <StatusBadge status={item.status} locale={locale} />
                </li>
              ))}
            </ul>
            {comingSoon.some((item) => item.key === "electronic_signature") && (
              <p className={styles.legalNote}>
                <TextLink href={legalHref(locale, eTransactions.slug)}>{eTransactions.title[locale]}</TextLink>
              </p>
            )}
          </Container>
        </Section>
      )}

      <Section labelledBy="fits-heading" density="dense">
        <Container>
          <SectionIntro headingId="fits-heading" heading={labels.whereItFitsHeading} subheading={labels.whereItFitsSubheading} />
          <JourneyChain locale={locale} label={labels.journeyLabel} current={stage?.key} />
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="alt" labelledBy="related-heading">
          <Container>
            <SectionIntro headingId="related-heading" heading={labels.relatedHeading} />
            <FeatureGrid items={related} surface="alt" moreLabel={dict.cta.learnMore} />
          </Container>
        </Section>
      )}

      <Section labelledBy="governance-heading" density="dense">
        <Container width="narrow" className={styles.governance}>
          <h2 id="governance-heading" className={styles.governanceHeading}>
            {labels.governanceHeading}
          </h2>
          <p>{labels.governanceBody}</p>
          <p className={styles.links}>
            <TextLink href={href(locale, "security")}>{labels.securityLink}</TextLink>
            <TextLink href={href(locale, "howItWorks")}>{labels.howItWorksLink}</TextLink>
            <TextLink href={href(locale, "solutions")}>{labels.solutionsLink}</TextLink>
            <TextLink href={href(locale, "pricing")}>{labels.pricingLink}</TextLink>
          </p>
        </Container>
      </Section>

      {faqs.length > 0 && (
        <>
          <Section tone="alt" density="dense" labelledBy="module-faq-heading">
            <Container width="narrow">
              <SectionIntro headingId="module-faq-heading" heading={labels.faqHeading} />
              <FaqAccordion items={faqs} />
            </Container>
          </Section>
          <FaqJsonLd items={faqs} />
        </>
      )}

      <CtaBand
        heading={labels.ctaHeading}
        primary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }}
        secondary={{ label: dict.cta.contactSales, href: href(locale, "contactSales") }}
      />
      <TrackEvent event="module_view" params={{ module_id: record.key, locale }} />
    </>
  );
}
