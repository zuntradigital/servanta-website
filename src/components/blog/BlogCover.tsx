/* eslint-disable @next/next/no-img-element -- media-library images of arbitrary size */
import { CalendarDays, ClipboardCheck, FileSignature, ReceiptText, type LucideIcon } from "lucide-react";
import type { BlogPost } from "@/content/blog";
import styles from "./Blog.module.css";

type Motif = "calendar" | "document" | "invoice" | "checklist";

const motifs: Record<string, { motif: Motif; icon: LucideIcon }> = {
  operations: { motif: "calendar", icon: CalendarDays },
  contracts: { motif: "document", icon: FileSignature },
  billing: { motif: "invoice", icon: ReceiptText },
  "field-service": { motif: "checklist", icon: ClipboardCheck },
};

/** Abstract product motif per category: shapes only, no text or numbers that could read as data. */
function MotifArt({ motif }: { motif: Motif }) {
  if (motif === "calendar") {
    return (
      <div className={styles.motifCalendar}>
        {Array.from({ length: 21 }, (_, i) => (
          <span key={i} className={[3, 8, 10, 15, 17].includes(i) ? styles.on : i === 12 ? styles.onStrong : undefined} />
        ))}
      </div>
    );
  }
  if (motif === "invoice") {
    return (
      <div className={styles.motifRows}>
        {[72, 54, 64, 40].map((w, i) => (
          <span key={i}>
            <i style={{ width: `${w}%` }} />
            <b />
          </span>
        ))}
        <span className={styles.total}>
          <i />
          <b />
        </span>
      </div>
    );
  }
  if (motif === "checklist") {
    return (
      <div className={styles.motifChecklist}>
        {[80, 64, 72, 50].map((w, i) => (
          <span key={i} className={i < 3 ? styles.done : undefined}>
            <em />
            <i style={{ width: `${w}%` }} />
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className={styles.motifDocument}>
      {[90, 76, 84, 60, 70].map((w, i) => (
        <i key={i} style={{ width: `${w}%` }} />
      ))}
      <span className={styles.signature} />
    </div>
  );
}

/**
 * Cover image, or a designed brand panel with a product motif for the
 * post's category when no cover exists yet (no stock imagery stands in).
 */
export function BlogCover({ post, priority }: { post: BlogPost; categoryName: string; priority?: boolean }) {
  if (post.cover) {
    return (
      <div className={styles.cover}>
        <img src={post.cover.src} alt={post.cover.alt} loading={priority ? "eager" : "lazy"} />
      </div>
    );
  }
  const { motif, icon: Icon } = motifs[post.category] ?? motifs.operations;
  return (
    <div className={`${styles.cover} ${styles.coverPlaceholder}`} aria-hidden="true">
      <div className={styles.coverCard}>
        <span className={styles.coverIcon}>
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <MotifArt motif={motif} />
      </div>
    </div>
  );
}
