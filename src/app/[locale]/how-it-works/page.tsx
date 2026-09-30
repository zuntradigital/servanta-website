import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { PageIntro } from "@/components/sections/PageIntro";
import { Steps } from "@/components/sections/Steps";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ProductVisual } from "@/components/visuals/ProductVisual";
import { href, moduleHref } from "@/config/routes";
import { endToEndExample, journey } from "@/content/journey";
import { faqsByQuestion } from "@/content/pages/faq";
import { getHowItWorksContent } from "@/content/pages/how-it-works";
import { closingCta } from "@/content/shared";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { cx } from "@/lib/cx";
import { pageMetadata } from "@/lib/metadata";
import styles from "./how-it-works.module.css";

/** Record IDs (CON-1042, WO-3318…) never break at the hyphen and keep LTR order inside Arabic text. */
function withRecordIds(text: string) {
  return text.split(/([A-Z]{2,4}-\d{3,4})/).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className={styles.recordId}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export async function generateMetadata({ params }: PageProps<"/[locale]/how-it-works">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const { meta } = getHowItWorksContent(locale);
  return pageMetadata({
    locale,
    route: "howItWorks",
    title: meta.title,
    description: meta.description,
  });
}

/** How It Works (WEB-MKT-SRS-002 §60–61): every stage has a title, explanation, visual, related module and CTA. */
export default async function HowItWorksPage({ params }: PageProps<"/[locale]/how-it-works">) {
  const locale = await resolveLocale(params, "howItWorks");
  const dict = getDictionary(locale);
  const content = getHowItWorksContent(locale);
  const example = endToEndExample[locale];
  const faqs = faqsByQuestion(["How do I get started?", "Do you help with onboarding?", "Can field teams record work on site?"], locale);

  const stages = journey.map((stage) => ({
    title: stage.copy[locale].title,
    description: stage.copy[locale].description,
    link: { label: content.steps.moduleLink, href: moduleHref(locale, stage.module, stage.hash) },
    visual: <ProductVisual visual={stage.visual} locale={locale} />,
  }));

  return (
    <>
      <PageIntro title={content.intro.title} subtitle={content.intro.subtitle} />

      <Section labelledBy="steps-heading">
        <Container>
          <h2 id="steps-heading" className="visually-hidden">
            {content.steps.heading}
          </h2>
          <Steps variant="detailed" items={stages} />
        </Container>
      </Section>

      <Section tone="alt" labelledBy="example-heading">
        <Container>
          <SectionIntro headingId="example-heading" eyebrow={example.eyebrow} heading={example.heading} subheading={example.subheading} />
          <div className={styles.phases}>
            {example.phases.map((phase, phaseIndex) => {
              // Numbering runs continuously across the phases (1–11).
              const first = example.phases.slice(0, phaseIndex).reduce((count, p) => count + p.steps.length, 0) + 1;
              return (
                <section
                  key={phase.title}
                  className={styles.phase}
                  aria-labelledby={`example-phase-${phaseIndex}`}
                  data-reveal
                  style={{ ["--reveal-index" as string]: phaseIndex % 2 }}
                >
                  <h3 id={`example-phase-${phaseIndex}`} className={styles.phaseTitle}>
                    {phase.title}
                  </h3>
                  <ol role="list" start={first} className={styles.steps}>
                    {phase.steps.map((step, stepIndex) => (
                      <li key={step.title} className={styles.step}>
                        <span className={cx(styles.number, "ltr-number")} aria-hidden="true">
                          {String(first + stepIndex).padStart(2, "0")}
                        </span>
                        <div>
                          <p className={styles.stepTitle}>
                            <span className="visually-hidden">{first + stepIndex}. </span>
                            {step.title}
                          </p>
                          <p className={styles.stepText}>{withRecordIds(step.text)}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              );
            })}
          </div>
          <p className={styles.note}>{example.note}</p>
        </Container>
      </Section>

      <Section density="dense" labelledBy="process-faq-heading">
        <Container width="narrow">
          <SectionIntro headingId="process-faq-heading" heading={content.faq.heading} />
          <FaqAccordion items={faqs} />
        </Container>
      </Section>
      <FaqJsonLd items={faqs} />

      <CtaBand heading={closingCta(locale).heading} primary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }} secondary={{ label: dict.cta.seePricing, href: href(locale, "pricing") }} />
    </>
  );
}
