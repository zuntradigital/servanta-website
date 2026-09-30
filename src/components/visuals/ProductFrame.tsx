import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./ProductFrame.module.css";

type ProductFrameProps = {
  /** Visible label: illustrative compositions are never passed off as screenshots (DG-005). */
  caption: string;
  /** Accessible description of what the composition shows. */
  description: string;
  children: ReactNode;
  /** Use on alt-background sections so the frame still separates. */
  onAlt?: boolean;
  className?: string;
  /** Media governance (WEB-MKT-SRS-002 §59, §83): what this visual is. Every composition today is illustrative. */
  visualType?: "illustrative" | "actual_product";
};

/**
 * Product-visualization frame (spec §5.2): 14px radius, single border and a
 * soft shadow (reference), no browser chrome. The inner composition is presentational.
 */
export function ProductFrame({ caption, description, children, onAlt, className, visualType = "illustrative" }: ProductFrameProps) {
  return (
    <figure className={cx(styles.frame, onAlt && styles.onAlt, className)} role="img" aria-label={`${caption}: ${description}`} data-visual-type={visualType}>
      <figcaption className={styles.caption} aria-hidden="true">
        {caption}
      </figcaption>
      <div aria-hidden="true">{children}</div>
    </figure>
  );
}
