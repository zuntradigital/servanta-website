import { cx } from "@/lib/cx";
import { ProductFrame } from "./ProductFrame";
import styles from "./CommandCenterVisual.module.css";

export type CommandCenterContent = {
  caption: string;
  description: string;
  title: string;
  period: string;
  kpis: Array<{ label: string; value: string; unit?: string }>;
  attentionLabel: string;
  alerts: Array<{ text: string; meta?: string; severity: "danger" | "warning" }>;
  /** Illustrative monthly trend (values are relative bar heights, 0–100). */
  trend?: {
    label: string;
    legend: [string, string];
    months: string[];
    invoiced: number[];
    collected: number[];
  };
};

/** Illustrative Command Center composition for the Hero (spec §8). */
export function CommandCenterVisual({ content }: { content: CommandCenterContent }) {
  return (
    <ProductFrame caption={content.caption} description={content.description}>
      <div className={styles.header}>
        <span className={styles.title}>{content.title}</span>
        <span className={styles.period}>{content.period}</span>
      </div>
      <div className={styles.kpis}>
        {content.kpis.map((kpi) => (
          <div key={kpi.label} className={styles.kpi}>
            <div className={styles.kpiLabel}>{kpi.label}</div>
            <div className={cx(styles.kpiValue, "ltr-number")}>
              {kpi.unit && <span className={styles.unit}>{kpi.unit}</span>}
              {kpi.value}
            </div>
          </div>
        ))}
      </div>
      <div className={cx(styles.lower, content.trend && styles.lowerSplit)}>
        {content.trend && (
          <div className={styles.trend}>
            <div className={styles.trendHead}>
              <span className={styles.sectionLabel}>{content.trend.label}</span>
              <span className={styles.legend}>
                <span className={styles.legendInvoiced}>{content.trend.legend[0]}</span>
                <span className={styles.legendCollected}>{content.trend.legend[1]}</span>
              </span>
            </div>
            <div className={styles.bars}>
              {content.trend.months.map((month, index) => (
                <div key={month} className={styles.barGroup}>
                  <div className={styles.barPair}>
                    <span className={styles.barInvoiced} style={{ height: `${content.trend!.invoiced[index]}%` }} />
                    <span className={styles.barCollected} style={{ height: `${content.trend!.collected[index]}%` }} />
                  </div>
                  <span className={styles.month}>{month}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <div className={styles.sectionLabel}>{content.attentionLabel}</div>
          <div className={styles.alerts}>
            {content.alerts.map((alert) => (
              <div key={alert.text} className={cx(styles.alert, alert.severity === "warning" && styles.warn)}>
                <span className={styles.alertText}>{alert.text}</span>
                {alert.meta && <span className={styles.alertMeta}>{alert.meta}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}
