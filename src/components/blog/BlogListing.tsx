import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogCategory, BlogPost } from "@/content/blog";
import { cx } from "@/lib/cx";
import { BlogCard } from "./BlogCard";
import styles from "./Blog.module.css";

export type BlogListingLabels = {
  filterLabel: string;
  all: string;
  empty: string;
  emptyAction: string;
  readTime: string;
  pagination: string;
  previous: string;
  next: string;
  page: string;
};

type BlogListingProps = {
  posts: Array<BlogPost & { href: string }>;
  categories: BlogCategory[];
  /** Selected category slug from the URL, or null for all. */
  category: string | null;
  /** 1-based page number from the URL; clamped to the available pages. */
  page: number;
  /** Listing URL without query, e.g. /en/blog. */
  baseHref: string;
  locale: string;
  pageSize?: number;
  labels: BlogListingLabels;
};

/** Builds a listing URL; the first page and "all" stay off the query string. */
export function blogListingHref(baseHref: string, category: string | null, page = 1): string {
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (page > 1) query.set("page", String(page));
  const search = query.toString();
  return search ? `${baseHref}?${search}` : baseHref;
}

/**
 * Category filter chips + card grid + pagination, with an empty state
 * (spec §6, §18). Filter and page live in the URL (`?category=&page=`), so
 * every state is linkable, crawlable and survives reload and Back.
 */
export function BlogListing({ posts, categories, category, page, baseHref, locale, pageSize = 6, labels }: BlogListingProps) {
  const filtered = category ? posts.filter((p) => p.category === category) : posts;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);

  return (
    <div>
      <nav className={styles.filters} aria-label={labels.filterLabel}>
        {[{ slug: null as string | null, name: labels.all }, ...categories].map((c) => {
          const active = category === c.slug;
          return (
            <Link
              key={c.slug ?? "all"}
              href={blogListingHref(baseHref, c.slug)}
              scroll={false}
              className={cx(styles.chip, active && styles.chipActive)}
              aria-current={active ? "page" : undefined}
            >
              {c.name}
            </Link>
          );
        })}
      </nav>

      <div aria-live="polite">
        {visible.length === 0 ? (
          <div className={styles.empty}>
            <p>{labels.empty}</p>
            <Link href={baseHref} scroll={false} className={styles.emptyAction}>
              {labels.emptyAction}
            </Link>
          </div>
        ) : (
          <ul role="list" className={styles.grid}>
            {visible.map((post, index) => (
              <li key={post.slug} data-reveal style={{ ["--reveal-index" as string]: index % 3 }}>
                <BlogCard post={post} href={post.href} readLabel={labels.readTime} locale={locale} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {pageCount > 1 && (
        <nav className={styles.pagination} aria-label={labels.pagination}>
          <PageLink disabled={current === 1} href={blogListingHref(baseHref, category, current - 1)} label={labels.previous}>
            <ChevronLeft size={18} className="flip-rtl" aria-hidden="true" />
          </PageLink>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={blogListingHref(baseHref, category, n)}
              className={cx(styles.pageButton, n === current && styles.pageActive)}
              aria-current={n === current ? "page" : undefined}
              aria-label={`${labels.page} ${n}`}
            >
              <span className="ltr-number">{n}</span>
            </Link>
          ))}
          <PageLink disabled={current === pageCount} href={blogListingHref(baseHref, category, current + 1)} label={labels.next}>
            <ChevronRight size={18} className="flip-rtl" aria-hidden="true" />
          </PageLink>
        </nav>
      )}
    </div>
  );
}

function PageLink({ disabled, href, label, children }: { disabled: boolean; href: string; label: string; children: ReactNode }) {
  if (disabled) {
    return (
      <span className={cx(styles.pageButton, styles.pageDisabled)} aria-disabled="true" aria-label={label} role="link">
        {children}
      </span>
    );
  }
  return (
    <Link href={href} className={styles.pageButton} aria-label={label}>
      {children}
    </Link>
  );
}
