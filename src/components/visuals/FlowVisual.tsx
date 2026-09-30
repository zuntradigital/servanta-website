import { ProductFrame } from "./ProductFrame";
import styles from "./FlowVisual.module.css";

export type FlowContent = {
  caption: string;
  description: string;
  nodes: Array<{ label: string; meta: string; status?: string }>;
  footer?: { label: string; value: string };
};

/** Contract → Service → Work Order → Invoice flow in product-UI style (spec §8). */
export function FlowVisual({ content, onAlt }: { content: FlowContent; onAlt?: boolean }) {
  return (
    <ProductFrame caption={content.caption} description={content.description} onAlt={onAlt}>
      <ol className={styles.flow} style={{ ["--count" as string]: content.nodes.length }}>
        {content.nodes.map((node, index) => (
          <li key={node.label} className={styles.node}>
            <span className={`${styles.number} ltr-number`}>{index + 1}</span>
            <div className={styles.card}>
              <div className={styles.label}>{node.label}</div>
              <div className={`${styles.meta} ltr-number`}>{node.meta}</div>
              {node.status && <span className={styles.status}>{node.status}</span>}
            </div>
          </li>
        ))}
      </ol>
      {content.footer && (
        <div className={styles.footer}>
          <span>{content.footer.label}</span>
          <strong className="ltr-number">{content.footer.value}</strong>
        </div>
      )}
    </ProductFrame>
  );
}
