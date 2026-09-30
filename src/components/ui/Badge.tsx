import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Badge.module.css";

type BadgeProps = {
  children: ReactNode;
  tone?: "accent" | "neutral" | "success" | "warning";
  className?: string;
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return <span className={cx(styles.badge, styles[tone], className)}>{children}</span>;
}
