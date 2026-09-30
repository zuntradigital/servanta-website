import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cx } from "@/lib/cx";
import styles from "./PageIntro.module.css";

type PageIntroProps = {
  title: string;
  eyebrow?: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
  align?: "center" | "start";
  width?: "default" | "reading";
};

/** Page intro for inner pages (spec §6): hero-scale H1, one paragraph, no visual. */
export function PageIntro({ title, eyebrow, subtitle, actions, meta, align = "center", width = "default" }: PageIntroProps) {
  return (
    <section className={cx(styles.intro, align === "start" && styles.start)} aria-labelledby="page-title">
      <Container width={width}>
        {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
        <h1 id="page-title" className={styles.title}>
          {title}
        </h1>
        {subtitle && <p className={styles.sub}>{subtitle}</p>}
        {actions && <div className={styles.actions}>{actions}</div>}
        {meta && <p className={styles.meta}>{meta}</p>}
      </Container>
    </section>
  );
}
