import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section, type SectionTone } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";
import { cx } from "@/lib/cx";
import styles from "./ImageText.module.css";

type ImageTextProps = {
  id?: string;
  eyebrow?: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  link?: { label: string; href: string };
  visual: ReactNode;
  /** Logical position of the visual on desktop; mobile always shows it first. */
  visualPosition?: "start" | "end";
  tone?: SectionTone;
};

/** Image + Text (spec §5.4): alternating two-column story section. */
export function ImageText({ id, eyebrow, heading, paragraphs = [], bullets, link, visual, visualPosition = "start", tone = "surface" }: ImageTextProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <Section tone={tone} id={id} labelledBy={headingId}>
      <Container className={cx(styles.grid, visualPosition === "end" && styles.end)}>
        <div className={styles.visual} data-reveal="scale">
          {visual}
        </div>
        <div data-reveal style={{ ["--reveal-index" as string]: 2 }}>
          {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          {paragraphs.length > 0 && (
            <div className={styles.body}>
              {paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          )}
          {bullets && bullets.length > 0 && (
            <ul role="list" className={styles.list}>
              {bullets.map((item) => (
                <li key={item}>
                  <Check className={styles.check} size={14} strokeWidth={2.5} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {link && <TextLink href={link.href}>{link.label}</TextLink>}
        </div>
      </Container>
    </Section>
  );
}
