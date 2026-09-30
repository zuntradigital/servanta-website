import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { FeatureItem } from "@/content/types";
import { cx } from "@/lib/cx";
import styles from "./FeatureGrid.module.css";

type FeatureGridProps = {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  /** Background the grid sits on; icon tiles contrast against it. */
  surface?: "surface" | "alt";
  headingLevel?: "h3" | "h4";
  moreLabel?: string;
  /** tint = pale blue tile with blue icon; solid = brand-blue tile (product-style cards). */
  iconStyle?: "tint" | "solid";
};

/**
 * Feature Grid (spec §5.5); also used as the Service Grid when items link.
 * Semantically a list; each linked item is a single focusable link. Items are
 * quiet cards (reference): hairline border, soft shadow, 10px radius.
 */
export function FeatureGrid({ items, columns = 3, surface = "alt", headingLevel: Heading = "h3", moreLabel, iconStyle = "tint" }: FeatureGridProps) {
  return (
    <ul
      role="list"
      className={cx(
        styles.grid,
        columns === 2 && styles.cols2,
        columns === 4 && styles.cols4,
        surface === "alt" ? styles.onAlt : styles.onSurface,
        iconStyle === "solid" && styles.solid,
      )}
    >
      {items.map(({ icon: Icon, title, description, href, id, badge }, index) => (
        <li
          key={title}
          id={id}
          className={cx(styles.item, href && styles.linked)}
          data-reveal
          style={{ ["--reveal-index" as string]: index % 3 }}
        >
          <span className={styles.icon} aria-hidden="true">
            <Icon size={20} strokeWidth={1.8} />
          </span>
          <Heading className={styles.title}>
            {href ? (
              <Link href={href} className={styles.titleLink} data-cta="">
                {title}
              </Link>
            ) : (
              title
            )}
          </Heading>
          {badge && (
            <Badge tone={badge.tone} className={styles.badge}>
              {badge.label}
            </Badge>
          )}
          <p className={styles.description}>{description}</p>
          {href && moreLabel && (
            <span className={styles.more} aria-hidden="true">
              {moreLabel}
              <ArrowRight size={14} className={cx(styles.moreIcon, "flip-rtl")} />
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
