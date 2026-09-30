import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CapabilityMap } from "@/components/sections/CapabilityMap";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { DashboardQuestions, JourneyChain } from "@/components/sections/ProductStory";
import { Statistics } from "@/components/sections/Statistics";
import { Testimonials } from "@/components/sections/Testimonial";
import { testimonials } from "@/content/testimonials";
import { Steps } from "@/components/sections/Steps";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import { CommandCenterVisual } from "@/components/visuals/CommandCenterVisual";
import { brand, showContentPlaceholders } from "@/config/brand";
import { heroBackground } from "@/config/hero";
import { href, moduleHref } from "@/config/routes";
import { capabilityMap, groupLabels, statusLabels, type Capability } from "@/content/catalog";
import { getHomeContent } from "@/content/home";
import { getModulePageLabels } from "@/content/pages/module-page";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/locales";
import { pageMetadata } from "@/lib/metadata";
import styles from "./home.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getHomeContent(locale);
  return {
    ...pageMetadata({ locale, route: "home", description: content.meta.description }),
    title: content.meta.title ? { absolute: `${content.meta.title} — ${brand.name}` } : undefined,
  };
}

function capabilityHref(locale: Locale, capability: Capability): string | undefined {
  const link = capability.link;
  if (!link) return undefined;
  if ("module" in link) return moduleHref(locale, link.module, link.hash);
  return href(locale, link.route, link.hash);
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const content = getHomeContent(locale);
  const labels = getModulePageLabels(locale);
  const mapGroups = capabilityMap().map(({ group, items }) => ({
    key: group,
    title: groupLabels[locale][group],
    items: items.map((item) => ({
      key: item.key,
      name: item.name[locale],
      href: capabilityHref(locale, item),
      badge: item.status === "COMING_SOON" ? statusLabels[locale].COMING_SOON : undefined,
    })),
  }));

  return (
    <>
      <Hero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        titleHighlight={content.hero.titleHighlight}
        subtitle={content.hero.subtitle}
        primaryCta={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }}
        secondaryCta={{ label: dict.cta.explorePlatform, href: href(locale, "platform") }}
        visual={<CommandCenterVisual content={content.hero.visual} />}
        highlights={content.hero.highlights}
        background={heroBackground}
      />

      <LogoCloud
        label={content.trust.label}
        logos={content.trust.logos}
        placeholderCount={0}
        placeholderNote={content.trust.placeholderNote}
      />

      {/* Connected system (WEB-MKT-SRS-002 §10): each node links to the module that explains it. */}
      <Section id="product-story" labelledBy="product-story-heading">
        <Container>
          <SectionIntro
            headingId="product-story-heading"
            eyebrow={content.story.eyebrow}
            heading={content.story.heading}
            subheading={content.story.paragraphs[0]}
          />
          <JourneyChain locale={locale} label={labels.journeyLabel} />
          <p className={styles.faqMore}>
            <TextLink href={href(locale, "howItWorks")}>{dict.cta.learnHowItWorks}</TextLink>
          </p>
        </Container>
      </Section>

      <Section tone="alt" labelledBy="capabilities-heading">
        <Container className={styles.split}>
          <SectionIntro
            headingId="capabilities-heading"
            eyebrow={content.capabilities.eyebrow}
            heading={content.capabilities.heading}
            subheading={content.capabilities.subheading}
            align="start"
            bare
            className={styles.splitIntro}
            actions={
              <Button href={href(locale, "platform")} arrow>
                {dict.cta.explorePlatform}
              </Button>
            }
          />
          <CapabilityMap groups={mapGroups} columns={2} />
        </Container>
      </Section>

      {/* Dashboard showcase (§12): what the Command Center answers, not a decorative image. */}
      <Section labelledBy="dashboard-heading">
        <Container>
          <SectionIntro headingId="dashboard-heading" heading={labels.dashboardHeading} subheading={labels.dashboardSubheading} />
          <DashboardQuestions locale={locale} />
          <p className={styles.faqMore}>
            <TextLink href={moduleHref(locale, "command-center")}>{labels.dashboardLink}</TextLink>
          </p>
        </Container>
      </Section>

      <Section labelledBy="flow-heading">
        <Container>
          <SectionIntro headingId="flow-heading" eyebrow={content.flow.eyebrow} heading={content.flow.heading} subheading={content.flow.subheading} />
          <Steps items={content.flow.items} />
        </Container>
      </Section>

      {showContentPlaceholders && (
        <Section tone="alt" density="dense" labelledBy="stats-heading">
          <Container>
            <h2 id="stats-heading" className="visually-hidden">
              {content.stats.heading}
            </h2>
            <Statistics items={content.stats.items} note={content.stats.note} />
          </Container>
        </Section>
      )}

      {/* Renders nothing until real, approved testimonials exist (content/testimonials.ts). */}
      <Testimonials items={testimonials} locale={locale} heading={dict.common.testimonialsHeading} />

      <Section labelledBy="solutions-heading">
        <Container>
          <SectionIntro headingId="solutions-heading" eyebrow={content.solutions.eyebrow} heading={content.solutions.heading} subheading={content.solutions.subheading} />
          <FeatureGrid items={content.solutions.items} surface="surface" iconStyle="solid" moreLabel={dict.cta.learnMore} />
        </Container>
      </Section>

      <Section tone="alt" density="dense" labelledBy="faq-heading">
        <Container width="narrow">
          <SectionIntro headingId="faq-heading" eyebrow={content.faq.eyebrow} heading={content.faq.heading} />
          <FaqAccordion items={content.faq.items} />
          <p className={styles.faqMore}>
            <TextLink href={href(locale, "faq")}>{dict.cta.seeAllFaqs}</TextLink>
          </p>
        </Container>
      </Section>
      <FaqJsonLd items={content.faq.items} />

      <CtaBand eyebrow={content.cta.eyebrow} heading={content.cta.heading} primary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }} />
    </>
  );
}
