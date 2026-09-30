import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogListing, blogListingHref } from "@/components/blog/BlogListing";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { blogPostHref, href } from "@/config/routes";
import { localizedCategories, sortedPosts } from "@/content/blog";
import { getBlogPageContent } from "@/content/pages/blog-page";
import { getNewsletterLabels } from "@/content/pages/newsletter";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./blog.module.css";

type Props = PageProps<"/[locale]/blog">;

/** Reads `?category=` and `?page=`; unknown categories fall through to the empty state. */
async function listingState(searchParams: Props["searchParams"]) {
  const query = await searchParams;
  const category = typeof query.category === "string" && query.category ? query.category : null;
  const rawPage = Number(typeof query.page === "string" ? query.page : 1);
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  return { category, page };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const locale = await metaLocale(params);
  const { category, page } = await listingState(searchParams);
  const { meta } = getBlogPageContent(locale);
  return pageMetadata({
    locale,
    route: "blog",
    // Each filtered page is its own canonical URL so it can be indexed.
    path: blogListingHref("/blog", category, page),
    title: meta.title,
    description: meta.description,
  });
}

export default async function BlogPage({ params, searchParams }: Props) {
  const locale = await resolveLocale(params, "blog");
  const { category, page } = await listingState(searchParams);
  const dict = getDictionary(locale);
  const copy = getBlogPageContent(locale);
  const posts = sortedPosts(locale);
  const categories = localizedCategories(locale).filter((c) => posts.some((p) => p.category === c.slug));

  // The featured article leads the unfiltered first page and is left out of
  // the unfiltered grid; a category view lists every article in it.
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const featured = !category && page === 1 ? featuredPost : undefined;
  const listed = category ? posts : posts.filter((p) => p !== featuredPost);

  return (
    <>
      <PageIntro title={copy.intro.title} subtitle={copy.intro.subtitle} />

      <Section density="dense" ariaLabel={copy.sectionLabel}>
        <Container>
          {posts.length > 0 ? (
            <>
              {featured && (
                <div className={styles.featured}>
                  <BlogCard
                    post={featured}
                    href={blogPostHref(locale, featured.slug)}
                    readLabel={dict.common.readTime}
                    variant="featured"
                    headingLevel="h2"
                    locale={locale}
                  />
                </div>
              )}
              <h2 className={styles.latest}>{copy.latest}</h2>
              <BlogListing
                posts={listed.map((p) => ({ ...p, href: blogPostHref(locale, p.slug) }))}
                categories={categories}
                category={category}
                page={page}
                baseHref={href(locale, "blog")}
                locale={locale}
                labels={{ ...copy.listing, readTime: dict.common.readTime }}
              />
            </>
          ) : (
            <p className={styles.none}>{copy.none}</p>
          )}
        </Container>
      </Section>

      <NewsletterForm labels={getNewsletterLabels(locale)} locale={locale} privacyHref={href(locale, "privacy")} />
    </>
  );
}
