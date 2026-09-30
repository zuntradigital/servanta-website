import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { ImageText } from "@/components/sections/ImageText";
import { PageIntro } from "@/components/sections/PageIntro";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ArchitectureCrop } from "@/components/visuals/UiCrops";
import { href } from "@/config/routes";
import { brand } from "@/config/brand";
import { faqsByQuestion } from "@/content/pages/faq";
import { getSecurityContent } from "@/content/pages/security";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./security.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/security">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const { meta } = getSecurityContent(locale);
  return pageMetadata({ locale, route: "security", title: meta.title, description: meta.description });
}

/** Security & Trust (WEB-MKT-SRS-002 §70–71). */
export default async function SecurityPage({ params }: PageProps<"/[locale]/security">) {
  const locale = await resolveLocale(params, "security");
  const dict = getDictionary(locale);
  const content = getSecurityContent(locale);
  const faqs = faqsByQuestion([`Is ${brand.name} multi-tenant and secure by design?`], locale);

  return (
    <>
      <PageIntro eyebrow={content.intro.eyebrow} title={content.intro.title} subtitle={content.intro.subtitle} />

      <ImageText
        id="overview"
        tone="alt"
        heading={content.overview.heading}
        paragraphs={content.overview.paragraphs}
        visual={<ArchitectureCrop onAlt locale={locale} />}
        visualPosition="start"
      />

      <Section labelledBy="controls-heading">
        <Container>
          <SectionIntro headingId="controls-heading" heading={content.controls.heading} subheading={content.controls.subheading} />
          <FeatureGrid items={content.controls.items} surface="surface" />
        </Container>
      </Section>

      <Section tone="alt" density="dense" labelledBy="scope-heading">
        <Container width="narrow" className={styles.scope}>
          <h2 id="scope-heading" className={styles.scopeHeading}>
            {content.scope.heading}
          </h2>
          <p>{content.scope.body}</p>
        </Container>
      </Section>

      {faqs.length > 0 && (
        <>
          <Section density="dense" labelledBy="security-faq-heading">
            <Container width="narrow">
              <SectionIntro headingId="security-faq-heading" heading={dict.common.faqHeading} />
              <FaqAccordion items={faqs} />
            </Container>
          </Section>
          <FaqJsonLd items={faqs} />
        </>
      )}

      <CtaBand
        heading={content.intro.title}
        primary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }}
        secondary={{ label: dict.cta.contactSales, href: href(locale, "contactSales") }}
      />
    </>
  );
}
