import { Skeleton } from "@/components/ui/Skeleton";
import styles from "./Pricing.module.css";

/** Loading state: card shapes matching the 3-card layout (spec §7). */
export function PricingSkeleton({ label }: { label: string }) {
  return (
    <div role="status" aria-live="polite">
      <span className="visually-hidden">{label}</span>
      <div className={styles.plans}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles.plan} aria-hidden="true">
            <Skeleton width="40%" height={20} />
            <Skeleton width="80%" height={12} className={styles.skeletonGap} />
            <Skeleton width="55%" height={32} className={styles.skeletonGapLg} />
            {[0, 1, 2, 3, 4, 5].map((j) => (
              <Skeleton key={j} width="70%" height={12} className={styles.skeletonGap} />
            ))}
            <Skeleton width="100%" height={120} className={styles.skeletonGapLg} />
            <Skeleton width="100%" height={40} className={styles.skeletonGapLg} />
          </div>
        ))}
      </div>
    </div>
  );
}
