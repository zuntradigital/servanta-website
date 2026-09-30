import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Section.module.css";

export type SectionTone = "surface" | "alt" | "band" | "navy";
export type SectionDensity = "standard" | "dense" | "slim";

type SectionProps = {
  children: ReactNode;
  /** Sections alternate surface/alt with no border between them (spec §3). */
  tone?: SectionTone;
  density?: SectionDensity;
  id?: string;
  labelledBy?: string;
  ariaLabel?: string;
  className?: string;
};

export function Section({ children, tone = "surface", density = "standard", id, labelledBy, ariaLabel, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={cx(
        styles.section,
        tone === "alt" && styles.alt,
        tone === "band" && styles.band,
        tone === "navy" && styles.navy,
        density === "dense" && styles.dense,
        density === "slim" && styles.slim,
        className,
      )}
    >
      {children}
    </section>
  );
}
