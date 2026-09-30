import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Eyebrow } from "./Eyebrow";
import styles from "./SectionIntro.module.css";

type SectionIntroProps = {
  heading: ReactNode;
  headingId?: string;
  subheading?: ReactNode;
  eyebrow?: ReactNode;
  align?: "center" | "start";
  /** Drop the 40px gap before the section's first content row. */
  bare?: boolean;
  as?: "h2" | "h1";
  /** Optional call to action under the intro (split layouts). */
  actions?: ReactNode;
  className?: string;
};

export function SectionIntro({ heading, headingId, subheading, eyebrow, align = "center", bare, as: Heading = "h2", actions, className }: SectionIntroProps) {
  return (
    <div className={cx(styles.intro, align === "center" && styles.center, bare && styles.bare, className)} data-reveal>
      {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
      <Heading id={headingId} className={styles.heading}>
        {heading}
      </Heading>
      {subheading && <p className={styles.sub}>{subheading}</p>}
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
