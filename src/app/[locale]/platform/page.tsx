import type { Metadata } from "next";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ImageText } from "@/components/sections/ImageText";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import { ArchitectureCrop } from "@/components/visuals/UiCrops";
import { href } from "@/config/routes";
import { getPlatformContent } from "@/content/pages/platform";
import { closingCta } from "@/content/shared";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/platform">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const content = getPlatformContent(locale);
  return pageMetadata({
    locale,
    route: "platform",
    title: content.meta.title,
    description: content.meta.description,
  });
}

export default async function PlatformPage({ params }: PageProps<"/[locale]/platform">) {
  const locale = await resolveLocale(params, "platform");
  const dict = getDictionary(locale);
  const content = getPlatformContent(locale);
  const { compare } = content;

  return (
    <>
      <PageIntro eyebrow={content.intro.eyebrow} title={content.intro.title} subtitle={content.intro.subtitle} />

      <ImageText
        id="architecture"
        heading={content.architecture.heading}
        paragraphs={content.architecture.paragraphs}
        visual={<ArchitectureCrop locale={locale} />}
        visualPosition="end"
      />

      <Section tone="alt" labelledBy="pillars-heading">
        <Container>
          <SectionIntro
            headingId="pillars-heading"
            heading={content.pillars.heading}
            subheading={content.pillars.subheading}
            actions={<TextLink href={href(locale, "security")}>{dict.nav.security}</TextLink>}
          />
          <FeatureGrid items={content.pillars.items} surface="alt" />
        </Container>
      </Section>

      <Section labelledBy="compare-heading">
        <Container>
          <SectionIntro headingId="compare-heading" heading={compare.heading} subheading={compare.subheading} />
          <ComparisonTable
            caption={compare.caption}
            hideCaption
            firstColumnLabel={compare.firstColumnLabel}
            columns={compare.columns}
            highlightColumn={0}
            rows={compare.rows}
            labels={compare.labels}
          />
        </Container>
      </Section>

      <CtaBand heading={closingCta(locale).heading} primary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }} secondary={{ label: dict.cta.seePricing, href: href(locale, "pricing") }} />
    </>
  );
}
