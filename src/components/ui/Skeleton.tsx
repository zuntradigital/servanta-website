import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import styles from "./Skeleton.module.css";

type SkeletonProps = { width?: CSSProperties["width"]; height?: CSSProperties["height"]; className?: string };

export function Skeleton({ width = "100%", height = 12, className }: SkeletonProps) {
  return <span className={cx(styles.skeleton, className)} style={{ width, height }} aria-hidden="true" />;
}
