import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  /** reading = ~680px long-form measure; narrow = 720px (FAQ lists). */
  width?: "default" | "reading" | "narrow";
  as?: ElementType;
  className?: string;
};

export function Container({ children, width = "default", as: Tag = "div", className }: ContainerProps) {
  return (
    <Tag className={cx(styles.container, width === "reading" && styles.reading, width === "narrow" && styles.narrow, className)}>
      {children}
    </Tag>
  );
}
