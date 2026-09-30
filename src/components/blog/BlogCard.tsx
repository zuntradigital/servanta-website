import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate, getCategory, type BlogPost } from "@/content/blog";
import { cx } from "@/lib/cx";
import { BlogCover } from "./BlogCover";
import styles from "./Blog.module.css";

type BlogCardProps = {
  post: BlogPost;
  href: string;
  readLabel: string;
  variant?: "card" | "featured";
  headingLevel?: "h2" | "h3";
  locale?: string;
};

/** Blog Listing card / Featured Article (spec §9): the whole card is one link. */
export function BlogCard({ post, href, readLabel, variant = "card", headingLevel: Heading = "h3", locale = "en" }: BlogCardProps) {
  const category = getCategory(post.category, locale)?.name ?? post.category;
  return (
    <article className={cx(styles.card, variant === "featured" && styles.featured)}>
      <Link href={href} className={styles.cardLink}>
        <BlogCover post={post} categoryName={category} priority={variant === "featured"} />
        <div className={styles.cardBody}>
          <Badge tone="neutral">{category}</Badge>
          <Heading className={styles.cardTitle}>{post.title}</Heading>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <p className={styles.meta}>
            {post.author.name} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time> · {post.readMinutes} {readLabel}
          </p>
        </div>
      </Link>
    </article>
  );
}
