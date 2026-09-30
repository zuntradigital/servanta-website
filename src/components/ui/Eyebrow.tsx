import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Eyebrow.module.css";

export function Eyebrow({ children, className, onDark }: { children: ReactNode; className?: string; onDark?: boolean }) {
  return <p className={cx(styles.eyebrow, onDark && styles.onDark, className)}>{children}</p>;
}
