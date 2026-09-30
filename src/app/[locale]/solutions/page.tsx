import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { TextLink } from "@/components/ui/TextLink";
import { href, moduleHref, salesHref } from "@/config/routes";
import { getModulePageLabels } from "@/content/pages/module-page";
import { getSolutionsContent, personaModules } from "@/content/pages/solutions";
import { closingCta } from "@/content/shared";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./solutions.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/solutions">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const content = getSolutionsContent(locale);
  return pageMetadata({
    locale,
    route: "solutions",
    title: content.meta.title,
    description: content.meta.description,
  });
}

export default async function SolutionsPage({ params }: PageProps<"/[locale]/solutions">) {
  const locale = await resolveLocale(params, "solutions");
  const dict = getDictionary(locale);
  const { intro, personas } = getSolutionsContent(locale);
  const labels = getModulePageLabels(locale);

  return (
    <>
      <PageIntro
        title={intro.title}
        subtitle={intro.subtitle}
        actions={
          <nav aria-label={intro.navLabel} className={styles.jump}>
            {personas.map((p) => (
              <a key={p.id} href={`#${p.id}`} className={styles.jumpLink}>
                <p.icon size={16} strokeWidth={1.75} aria-hidden="true" />
                {p.title}
              </a>
            ))}
          </nav>
        }
      />

      {personas.map((persona, index) => (
        <Section key={persona.id} id={persona.id} tone={index % 2 === 1 ? "alt" : "surface"} labelledBy={`${persona.id}-heading`} className={styles.persona}>
          <Container>
            <div className={styles.head}>
              <Eyebrow>{`0${index + 1}`}</Eyebrow>
              <SectionIntro align="start" headingId={`${persona.id}-heading`} heading={persona.title} subheading={persona.summary} bare />
            </div>
            <FeatureGrid
              items={persona.items.map((item, i) => {
                const moduleKey = personaModules[persona.id]?.[i];
                return moduleKey ? { ...item, href: moduleHref(locale, moduleKey) } : item;
              })}
              surface={index % 2 === 1 ? "alt" : "surface"}
              moreLabel={dict.cta.learnMore}
            />
            <p className={styles.workflow}>
              <TextLink href={href(locale, "howItWorks")}>{labels.howItWorksLink}</TextLink>
            </p>
          </Container>
        </Section>
      ))}

      <CtaBand heading={closingCta(locale).heading} primary={{ label: dict.cta.talkToSales, href: salesHref(locale) }} secondary={{ label: dict.cta.exploreFeatures, href: href(locale, "features") }} />
    </>
  );
}
