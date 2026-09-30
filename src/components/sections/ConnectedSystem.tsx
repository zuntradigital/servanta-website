import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";
import styles from "./ConnectedSystem.module.css";

export type SystemNode = { key: string; label: string; href?: string };

/**
 * Connected-system chain (WEB-MKT-SRS-002 §10): every node links to the page
 * that explains it. `current` highlights the node for the page being viewed.
 */
export function ConnectedSystem({ nodes, label, current }: { nodes: SystemNode[]; label: string; current?: string }) {
  return (
    <ol role="list" className={styles.chain} aria-label={label}>
      {nodes.map((node, index) => {
        const isCurrent = node.key === current;
        return (
          <li key={node.key} className={styles.item} data-reveal="fade" style={{ ["--reveal-index" as string]: index }}>
            {node.href && !isCurrent ? (
              <Link href={node.href} className={styles.node} data-cta={`system-${node.key}`}>
                <span className={cx(styles.index, "ltr-number")} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {node.label}
              </Link>
            ) : (
              <span className={cx(styles.node, isCurrent && styles.current)} aria-current={isCurrent ? "true" : undefined}>
                <span className={cx(styles.index, "ltr-number")} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {node.label}
              </span>
            )}
            {index < nodes.length - 1 && <ArrowRight size={16} className={cx(styles.arrow, "flip-rtl")} aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
