import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { cx } from "@/lib/cx";
import styles from "./CapabilityMap.module.css";

export type CapabilityMapGroup = {
  key: string;
  title: string;
  items: Array<{ key: string; name: string; href?: string; badge?: string }>;
};

/**
 * Capability map (WEB-MKT-SRS-002 §11): capabilities in understandable
 * groups. Items come from the capability catalog; unpublished ones never
 * reach this component. Groups with no items are not rendered (§124).
 */
export function CapabilityMap({ groups, columns = 3, headingLevel: Heading = "h3" }: { groups: CapabilityMapGroup[]; columns?: 2 | 3; headingLevel?: "h3" | "h4" }) {
  return (
    <ul role="list" className={cx(styles.grid, columns === 2 && styles.cols2)}>
      {groups
        .filter((group) => group.items.length > 0)
        .map((group, index) => (
          <li key={group.key} className={styles.group} data-reveal style={{ ["--reveal-index" as string]: index % 3 }}>
            <Heading className={styles.title}>{group.title}</Heading>
            <ul role="list" className={styles.items}>
              {group.items.map((item) => (
                <li key={item.key} className={styles.item}>
                  {item.href ? (
                    <Link href={item.href} className={styles.link}>
                      {item.name}
                    </Link>
                  ) : (
                    <span>{item.name}</span>
                  )}
                  {item.badge && <Badge tone="warning">{item.badge}</Badge>}
                </li>
              ))}
            </ul>
          </li>
        ))}
    </ul>
  );
}
