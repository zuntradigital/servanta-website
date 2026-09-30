import type { Metadata } from "next";
import Link from "next/link";
import { TrackEvent } from "@/components/analytics/TrackEvent";
import { Suspense } from "react";
import { formatLimit, PricingPlans } from "@/components/pricing/PricingPlans";
import { PricingSkeleton } from "@/components/pricing/PricingSkeleton";
import { ComparisonTable, type ComparisonValue } from "@/components/sections/ComparisonTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PageIntro } from "@/components/sections/PageIntro";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { href, legalHref } from "@/config/routes";
import { faqsByQuestion, pricingFaqIds } from "@/content/pages/faq";
import { legalCatalog } from "@/content/pages/legal";
import { getPricingPageContent } from "@/content/pages/pricing-page";
import { closingCta } from "@/content/shared";
import { getDictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import { getPublicPlans } from "@/lib/pricing";
import type { PublicPlan } from "@/lib/pricing-types";
import styles from "./pricing.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/pricing">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const { meta } = getPricingPageContent(locale);
  return pageMetadata({ locale, route: "pricing", title: meta.title, description: meta.description });
}

/** Comparison rows built from the plans' own entitlements and limits (§6, §15), never authored here. */
function comparisonRows(plans: PublicPlan[], atLaunch: string, perMonth: string) {
  const featureKeys = [...new Map(plans.flatMap((p) => p.version.feature_entitlements).map((e) => [e.key, e.label])).entries()];
  const limitKeys = [...new Map(plans.flatMap((p) => p.version.limits).map((l) => [l.key, l.label])).entries()];

  const features = featureKeys.map(([key, label]) => ({
    feature: label,
    values: plans.map((plan): ComparisonValue => {
      const e = plan.version.feature_entitlements.find((item) => item.key === key);
      if (!e) return false;
      const value = e.level_label ?? e.included;
      return e.availability === "at_launch" && value !== false ? { value, note: atLaunch } : value;
    }),
  }));
  const limits = limitKeys.map(([key, label]) => ({
    feature: label,
    values: plans.map((plan): ComparisonValue => {
      const limit = plan.version.limits.find((item) => item.key === key);
      return limit ? formatLimit(limit, perMonth) : false;
    }),
  }));
  return { features, limits };
}

/** Reads published plans; renders the error or empty state instead of a broken page. */
/** Legal documents linked from Pricing (MOD-LEGAL-CENTER-WEB §23; plans list the contract library). */
const pricingLegalDocs = legalCatalog.filter((doc) => doc.key === "subscription_terms" || doc.key === "contract_library_disclaimer");

async function PlansSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const copy = getPricingPageContent(locale);
  let plans: PublicPlan[];
  try {
    plans = await getPublicPlans(locale);
  } catch (error) {
    console.error("[pricing]", error);
    return (
      <div className={styles.error} data-testid="pricing-error">
        <Alert tone="info" title={copy.error.title}>
          {copy.error.body}
        </Alert>
        <Button href={href(locale, "contact")}>{dict.cta.contactUs}</Button>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className={styles.error} data-testid="pricing-empty">
        <Alert tone="info" title={copy.empty.title}>
          {copy.empty.body}
        </Alert>
        <Button href={href(locale, "contactSales")}>{dict.cta.talkToSales}</Button>
      </div>
    );
  }

  const highlightIndex = plans.findIndex((p) => p.is_recommended || p.is_popular);
  const { features, limits } = comparisonRows(plans, copy.labels.atLaunch, copy.labels.perMonth);
  const tableProps = {
    columns: plans.map((p) => p.name),
    highlightColumn: highlightIndex >= 0 ? highlightIndex : undefined,
    labels: { included: copy.compare.included, notIncluded: copy.compare.notIncluded },
  };

  return (
    <>
      <PricingPlans
        plans={plans}
        locale={locale}
        labels={copy.labels}
        ctaHref={(plan) => `${href(locale, "contactSales")}?plan=${encodeURIComponent(plan.code)}`}
      />
      <ul role="list" className={styles.notes}>
        {copy.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
        <li>
          {pricingLegalDocs.map((doc, index) => (
            <span key={doc.key}>
              {index > 0 && " · "}
              <Link href={legalHref(locale, doc.slug)}>{doc.title[locale]}</Link>
            </span>
          ))}
        </li>
      </ul>

      <div id="compare-plans" className={styles.compare}>
        <h2 className={styles.compareHeading}>{copy.compare.heading}</h2>
        {features.length > 0 && (
          <ComparisonTable caption={copy.compare.featuresCaption} firstColumnLabel={copy.compare.firstColumn} rows={features} {...tableProps} />
        )}
        {limits.length > 0 && (
          <div className={styles.compareNext}>
            <ComparisonTable caption={copy.compare.limitsCaption} firstColumnLabel={copy.compare.limitColumn} rows={limits} {...tableProps} />
          </div>
        )}
      </div>
    </>
  );
}

export default async function PricingPage({ params }: PageProps<"/[locale]/pricing">) {
  const locale = await resolveLocale(params, "pricing");
  const dict = getDictionary(locale);
  const faqs = faqsByQuestion(pricingFaqIds, locale);
  const copy = getPricingPageContent(locale);

  return (
    <>
      <PageIntro
        title={copy.intro.title}
        subtitle={copy.intro.subtitle}
        meta={
          <a href="#compare-plans" className={styles.compareLink}>
            {dict.cta.comparePlans}
          </a>
        }
      />

      <Section density="dense" labelledBy="plans-heading">
        <Container>
          {/* Keeps the outline h1 → h2 → h3 (plan names); audit design finding #6. */}
          <h2 id="plans-heading" className="visually-hidden">
            {copy.plansHeading}
          </h2>
          <Suspense fallback={<PricingSkeleton label={copy.loading} />}>
            <PlansSection locale={locale} />
          </Suspense>
        </Container>
      </Section>

      <Section tone="alt" density="dense" labelledBy="pricing-faq-heading">
        <Container width="narrow">
          <SectionIntro headingId="pricing-faq-heading" heading={copy.faqHeading} />
          <FaqAccordion items={faqs} />
        </Container>
      </Section>
      <FaqJsonLd items={faqs} />

      <CtaBand
        heading={closingCta(locale).heading}
        primary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }}
        secondary={{ label: dict.cta.contactSales, href: href(locale, "contactSales") }}
      />
      <TrackEvent event="pricing_view" params={{ content_id: "pricing", locale }} />
    </>
  );
}
