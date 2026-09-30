import { Check, ChevronDown, Minus } from "lucide-react";
import { cx } from "@/lib/cx";
import styles from "./ComparisonTable.module.css";

/** `note` is a small tag after the value, e.g. "At launch" on the pricing comparison. */
export type ComparisonValue = boolean | string | { value: boolean | string; note?: string };

type ComparisonTableProps = {
  caption: string;
  /** Hide the caption visually (when a section heading already names the table). */
  hideCaption?: boolean;
  firstColumnLabel: string;
  columns: string[];
  rows: Array<{ feature: string; values: ComparisonValue[] }>;
  /** Index of a column to tint (e.g. the platform, or the recommended plan). */
  highlightColumn?: number;
  labels: { included: string; notIncluded: string };
};

function Cell({ value, labels }: { value: ComparisonValue; labels: ComparisonTableProps["labels"] }) {
  if (typeof value === "object")
    return (
      <span className={styles.withNote}>
        <Cell value={value.value} labels={labels} />
        {value.note && <span className={styles.note}>{value.note}</span>}
      </span>
    );
  if (value === true)
    return (
      <span className={styles.yes}>
        <Check size={18} strokeWidth={2} aria-hidden="true" />
        <span className="visually-hidden">{labels.included}</span>
      </span>
    );
  if (value === false)
    return (
      <span className={styles.no}>
        <Minus size={18} strokeWidth={1.75} aria-hidden="true" style={{ display: "inline" }} />
        <span className="visually-hidden">{labels.notIncluded}</span>
      </span>
    );
  return <>{value}</>;
}

/** Comparison (spec §9): a real table on desktop, stacked per column on mobile. */
export function ComparisonTable({ caption, hideCaption, firstColumnLabel, columns, rows, highlightColumn, labels }: ComparisonTableProps) {
  return (
    <>
      <table className={styles.table}>
        <caption className={hideCaption ? "visually-hidden" : undefined}>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{firstColumnLabel}</th>
            {columns.map((column, index) => (
              <th key={column} scope="col" className={cx(index === highlightColumn && styles.highlight)}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.feature}>
              <th scope="row">{row.feature}</th>
              {row.values.map((value, index) => (
                <td key={columns[index]} className={cx(index === highlightColumn && styles.highlight)}>
                  <Cell value={value} labels={labels} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.stacked}>
        {!hideCaption && <p className={styles.stackedTitle}>{caption}</p>}
        {columns.map((column, columnIndex) => (
          <details key={column} className={styles.details} open={columnIndex === (highlightColumn ?? 0)}>
            <summary className={styles.summary}>
              {column}
              <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
            </summary>
            <ul role="list" className={styles.list}>
              {rows.map((row) => (
                <li key={row.feature} className={styles.item}>
                  <span>{row.feature}</span>
                  <span className={styles.itemValue}>
                    <Cell value={row.values[columnIndex]} labels={labels} />
                  </span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </>
  );
}
