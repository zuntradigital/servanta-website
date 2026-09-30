import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cx } from "@/lib/cx";
import styles from "./CtaBand.module.css";

type CtaBandProps = {
  heading: string;
  body?: string;
  eyebrow?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  /** navy = closing band (spec §5.10); light = lower-emphasis inline variant. */
  tone?: "navy" | "light";
};

export function CtaBand({ heading, body, eyebrow, primary, secondary, tone = "navy" }: CtaBandProps) {
  const navy = tone === "navy";
  return (
    <section className={cx(styles.band, !navy && styles.light)} aria-labelledby="cta-heading">
      {navy && <div className={styles.backdrop} aria-hidden="true" />}
      <Container className={styles.inner}>
        <div className={styles.copy} data-reveal>
          {eyebrow && (
            <Eyebrow onDark={navy} className={styles.eyebrow}>
              {eyebrow}
            </Eyebrow>
          )}
          <h2 id="cta-heading" className={styles.heading}>
            {heading}
          </h2>
          {body && <p className={styles.body}>{body}</p>}
        </div>
        <div className={styles.actions} data-reveal style={{ ["--reveal-index" as string]: 2 }}>
          <Button href={primary.href} variant={navy ? "inverse" : "primary"} size="lg" arrow>
            {primary.label}
          </Button>
          {secondary &&
            (navy ? (
              <Link href={secondary.href} className={styles.secondary}>
                {secondary.label}
              </Link>
            ) : (
              <Button href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            ))}
        </div>
      </Container>
    </section>
  );
}
