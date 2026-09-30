import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageIntro } from "@/components/sections/PageIntro";
import { Steps } from "@/components/sections/Steps";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { href, salesHref } from "@/config/routes";
import { getServicesContent } from "@/content/pages/services";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const content = getServicesContent(locale);
  return pageMetadata({
    locale,
    route: "services",
    title: content.meta.title,
    description: content.meta.description,
  });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const locale = await resolveLocale(params, "services");
  const dict = getDictionary(locale);
  const sales = salesHref(locale);
  // Service Grid: vendor-relationship services, not the product's own service module.
  const content = getServicesContent(locale);

  return (
    <>
      <PageIntro eyebrow={content.intro.eyebrow} title={content.intro.title} subtitle={content.intro.subtitle} />

      <Section labelledBy="services-heading">
        <Container>
          <SectionIntro headingId="services-heading" heading={content.services.heading} subheading={content.services.subheading} />
          <FeatureGrid items={content.services.items} surface="surface" moreLabel={dict.cta.contactSales} />
        </Container>
      </Section>

      <Section tone="alt" labelledBy="engagement-heading">
        <Container>
          <SectionIntro headingId="engagement-heading" heading={content.engagement.heading} subheading={content.engagement.subheading} />
          <Steps items={content.engagement.items} />
        </Container>
      </Section>

      <CtaBand
        heading={content.cta.heading}
        primary={{ label: dict.cta.contactSales, href: sales }}
        secondary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }}
      />
    </>
  );
}
