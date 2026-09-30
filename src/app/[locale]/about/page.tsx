import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ImageText } from "@/components/sections/ImageText";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { FlowVisual } from "@/components/visuals/FlowVisual";
import { brand } from "@/config/brand";
import { href } from "@/config/routes";
import { getAboutContent } from "@/content/pages/about";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const content = getAboutContent(locale);
  return pageMetadata({
    locale,
    route: "about",
    title: content.meta.title,
    description: content.meta.description,
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params, "about");
  const dict = getDictionary(locale);
  const content = getAboutContent(locale);

  return (
    <>
      <PageIntro title={content.intro.title} subtitle={brand.tagline[locale] ?? brand.tagline.en} />

      <ImageText
        id="story"
        heading={content.story.heading}
        paragraphs={content.story.paragraphs}
        visual={<FlowVisual content={content.story.visual} />}
      />

      <Section tone="alt" labelledBy="values-heading">
        <Container>
          <SectionIntro headingId="values-heading" heading={content.values.heading} subheading={content.values.subheading} />
          <FeatureGrid items={content.values.items} surface="alt" />
        </Container>
      </Section>

      <CtaBand
        heading={content.cta.heading}
        primary={{ label: dict.cta.explorePlatform, href: href(locale, "platform") }}
        secondary={{ label: dict.cta.contactUs, href: href(locale, "contact") }}
      />
    </>
  );
}
