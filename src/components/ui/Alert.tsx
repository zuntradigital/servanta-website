import { AlertCircle, Info } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Alert.module.css";

type AlertProps = {
  title?: ReactNode;
  children?: ReactNode;
  tone?: "danger" | "info";
  className?: string;
};

export function Alert({ title, children, tone = "danger", className }: AlertProps) {
  const Icon = tone === "danger" ? AlertCircle : Info;
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cx(styles.alert, tone === "info" && styles.info, className)}>
      <Icon className={styles.icon} size={18} aria-hidden="true" />
      <div>
        {title && <p className={styles.title}>{title}</p>}
        {children}
      </div>
    </div>
  );
}
