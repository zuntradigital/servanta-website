import type { StatItem } from "@/content/types";
import styles from "./Statistics.module.css";

type StatisticsProps = {
  items: StatItem[];
  /** Label shown under example values until measured figures exist (DG-003). */
  note?: string;
};

/** Statistics (spec §5.7): number + label; numbers stay LTR in RTL pages. */
export function Statistics({ items, note }: StatisticsProps) {
  return (
    <>
      <dl className={styles.list}>
        {items.map((item) => (
          <div key={item.label} className={styles.stat} data-reveal>
            <dt className={styles.label}>{item.label}</dt>
            <dd className={`${styles.value} ltr-number`}>
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className={styles.note}>{note}</p>}
    </>
  );
}
