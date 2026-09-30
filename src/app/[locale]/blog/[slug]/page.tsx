import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackEvent } from "@/components/analytics/TrackEvent";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCover } from "@/components/blog/BlogCover";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { RichText } from "@/components/sections/RichText";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { blogPostHref, href } from "@/config/routes";
import { blogPosts, formatDate, getCategory, getPost, isPostAvailable, relatedPosts } from "@/content/blog";
import { getBlogPageContent } from "@/content/pages/blog-page";
import { getProductModules } from "@/content/pages/modules";
import { getNewsletterLabels } from "@/content/pages/newsletter";
import { locales } from "@/i18n/locales";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./article.module.css";

export function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.filter((post) => isPostAvailable(post, locale)).map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const locale = await metaLocale(params);
  const post = getPost(slug, locale);
  if (!post) return {};
  return pageMetadata({
    locale,
    path: `/blog/${post.slug}`,
    availableLocales: locales.filter((l) => isPostAvailable(post, l)),
    title: post.title,
    description: post.excerpt,
  });
}

export default async function BlogArticlePage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const locale = await resolveLocale(params, "blog");
  const { slug } = await params;
  const post = getPost(slug, locale);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const copy = getBlogPageContent(locale).article;
  const category = getCategory(post.category, locale)?.name ?? post.category;
  const related = relatedPosts(post, 3, locale);
  const modules = getProductModules(locale).filter((m) => post.relatedModules?.some((key) => key === m.id));
  const url = blogPostHref(locale, post.slug);
  const initials = post.author.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <>
      <article aria-labelledby="page-title">
        <header className={styles.header}>
          <Container width="reading">
            <Breadcrumbs
              label={copy.breadcrumb}
              items={[
                { label: dict.nav.home, href: href(locale, "home") },
                { label: dict.nav.blog, href: href(locale, "blog") },
                { label: post.title, href: url },
              ]}
            />
            <div className={styles.tag}>
              <Badge tone="neutral">{category}</Badge>
            </div>
            <h1 id="page-title" className={styles.title}>
              {post.title}
            </h1>
            <p className={styles.meta}>
              {post.author.name} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time> · {post.readMinutes} {dict.common.readTime}
            </p>
          </Container>
          <Container className={styles.coverWrap}>
            <BlogCover post={post} categoryName={category} priority />
          </Container>
        </header>

        <Container width="reading" className={styles.body}>
          <RichText blocks={post.body} />

          <footer className={styles.author}>
            <span className={styles.avatar} aria-hidden="true">
              {initials}
            </span>
            <div>
              <p className={styles.authorName}>{post.author.name}</p>
              <p className={styles.authorTitle}>{post.author.title}</p>
            </div>
          </footer>
        </Container>
      </article>
      <TrackEvent event="blog_article_view" params={{ article_slug: post.slug, category: post.category, author_id: post.author.name, locale }} />
      <ArticleJsonLd title={post.title} description={post.excerpt} url={url} datePublished={post.publishedAt} author={post.author.name} />

      {modules.length > 0 && (
        <Section density="dense" labelledBy="article-modules-heading">
          <Container>
            <h2 id="article-modules-heading" className={styles.relatedHeading}>
              {copy.modulesHeading}
            </h2>
            <FeatureGrid items={modules} surface="surface" moreLabel={dict.cta.learnMore} />
          </Container>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone="alt" density="dense" labelledBy="related-heading">
          <Container>
            <h2 id="related-heading" className={styles.relatedHeading}>
              {copy.related}
            </h2>
            <ul role="list" className={styles.related}>
              {related.map((p) => (
                <li key={p.slug}>
                  <BlogCard post={p} href={blogPostHref(locale, p.slug)} readLabel={dict.common.readTime} locale={locale} />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <NewsletterForm labels={getNewsletterLabels(locale)} locale={locale} privacyHref={href(locale, "privacy")} />

      <CtaBand tone="light" heading={copy.ctaHeading} primary={{ label: dict.cta.requestDemo, href: href(locale, "requestDemo") }} />
    </>
  );
}
