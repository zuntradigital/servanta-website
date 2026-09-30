import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PageIntro } from "@/components/sections/PageIntro";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { href } from "@/config/routes";
import { getFaqGroups } from "@/content/pages/faq";
import { getFaqPageContent } from "@/content/pages/faq-page";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./faq.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/faq">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const content = getFaqPageContent(locale);
  return pageMetadata({
    locale,
    route: "faq",
    title: content.meta.title,
    description: content.meta.description,
  });
}

export default async function FaqPage({ params }: PageProps<"/[locale]/faq">) {
  const locale = await resolveLocale(params, "faq");
  const dict = getDictionary(locale);
  const content = getFaqPageContent(locale);
  const faqGroups = getFaqGroups(locale);

  return (
    <>
      <PageIntro title={content.intro.title} subtitle={content.intro.subtitle} />

      <Section density="dense">
        <Container className={styles.layout}>
          <nav className={styles.toc} aria-label={content.tocLabel}>
            <ul role="list">
              {faqGroups.map((group) => (
                <li key={group.id}>
                  <a href={`#${group.id}`}>{group.title}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.groups}>
            {faqGroups.map((group) => (
              <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className={styles.group}>
                <h2 id={`${group.id}-heading`} className={styles.groupTitle}>
                  {group.title}
                </h2>
                <FaqAccordion items={group.items} />
              </section>
            ))}
          </div>
        </Container>
      </Section>
      <FaqJsonLd items={faqGroups.flatMap((g) => g.items)} />

      <CtaBand
        tone="light"
        heading={content.cta.heading}
        body={content.cta.body}
        primary={{ label: dict.cta.contactUs, href: href(locale, "contact") }}
      />
    </>
  );
}
