import type { ReactNode } from "react";
import { TextLink } from "@/components/ui/TextLink";
import type { StepItem } from "@/content/types";
import { cx } from "@/lib/cx";
import styles from "./Steps.module.css";

type StepsProps = {
  items: Array<StepItem & { visual?: ReactNode }>;
  /** compact = horizontal summary; detailed = vertical with optional UI crops. */
  variant?: "compact" | "detailed";
};

/** Steps (spec §5.6): ordered list, numbered navy nodes joined by a connector. */
export function Steps({ items, variant = "compact" }: StepsProps) {
  return (
    <ol role="list" className={cx(styles.list, variant === "detailed" && styles.detailed)}>
      {items.map((item, index) => (
        <li key={item.title} className={styles.step} data-reveal style={{ ["--reveal-index" as string]: index }}>
          <span className={cx(styles.number, "ltr-number")} aria-hidden="true">
            {index + 1}
          </span>
          <div className={styles.content}>
            <div>
              <h3 className={styles.title}>
                <span className="visually-hidden">{index + 1}. </span>
                {item.title}
              </h3>
              <p className={styles.description}>{item.description}</p>
              {item.link && (
                <p className={styles.link}>
                  <TextLink href={item.link.href}>{item.link.label}</TextLink>
                </p>
              )}
            </div>
            {item.visual && <div className={styles.visual}>{item.visual}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
