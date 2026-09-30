import type { ReactNode } from "react";
import styles from "./ErrorState.module.css";

type ErrorStateProps = {
  code: string;
  title: string;
  body: string;
  actions: ReactNode;
};

export function ErrorState({ code, title, body, actions }: ErrorStateProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <p className={`${styles.code} ltr-number`} aria-hidden="true">
          {code}
        </p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.body}>{body}</p>
        <div className={styles.actions}>{actions}</div>
      </div>
    </div>
  );
}
