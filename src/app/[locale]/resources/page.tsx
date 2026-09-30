import type { Metadata } from "next";
import { BookOpen, CircleHelp } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { blogPostHref, href } from "@/config/routes";
import { sortedPosts } from "@/content/blog";
import { getResourcesContent } from "@/content/pages/resources";
import { closingCta } from "@/content/shared";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./resources.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/resources">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const { meta } = getResourcesContent(locale);
  return pageMetadata({ locale, route: "resources", title: meta.title, description: meta.description });
}

/** Resources hub (WEB-MKT-SRS-002 §7.2): links only to resource types that exist. */
export default async function ResourcesPage({ params }: PageProps<"/[locale]/resources">) {
  const locale = await resolveLocale(params, "resources");
  const dict = getDictionary(locale);
  const content = getResourcesContent(locale);
  const latest = sortedPosts(locale).slice(0, 3);

  return (
    <>
      <PageIntro title={content.intro.title} subtitle={content.intro.subtitle} />

      <Section labelledBy="resource-types-heading">
        <Container>
          <SectionIntro headingId="resource-types-heading" heading={content.sections.heading} />
          <FeatureGrid
            columns={2}
            surface="surface"
            moreLabel={dict.cta.learnMore}
            items={[
              { icon: BookOpen, title: content.sections.blog.title, description: content.sections.blog.description, href: href(locale, "blog") },
              { icon: CircleHelp, title: content.sections.faq.title, description: content.sections.faq.description, href: href(locale, "faq") },
            ]}
          />
        </Container>
      </Section>

      {latest.length > 0 && (
        <Section tone="alt" labelledBy="latest-heading">
          <Container>
            <SectionIntro headingId="latest-heading" heading={content.latest} />
            <ul role="list" className={styles.posts}>
              {latest.map((post) => (
                <li key={post.slug}>
                  <BlogCard post={post} href={blogPostHref(locale, post.slug)} readLabel={dict.common.readTime} locale={locale} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <CtaBand heading={closingCta(locale).heading} primary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }} />
    </>
  );
}
