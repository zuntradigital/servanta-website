import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import type { HeroBackground } from "@/config/hero";
import { cx } from "@/lib/cx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Parallax } from "@/components/ui/Parallax";
import styles from "./Hero.module.css";

type HeroProps = {
  eyebrow?: string;
  title: string;
  /** Part of the title set in brand blue (must appear verbatim in `title`). */
  titleHighlight?: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  visual?: ReactNode;
  /** Short platform facts in a row under the hero. */
  highlights?: Array<{ icon: LucideIcon; title: string; description: string }>;
  /** Optional background photo (config/hero.ts). */
  background?: HeroBackground | null;
};

function renderTitle(title: string, highlight?: string) {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || at < 0) return title;
  return (
    <>
      {title.slice(0, at)}
      <span className={styles.highlight}>{highlight}</span>
      {title.slice(at + highlight.length)}
    </>
  );
}

/** Hero (spec §5.2): the page's only <h1>, with the product visual as focal point. */
export function Hero({ eyebrow, title, titleHighlight, subtitle, primaryCta, secondaryCta, visual, highlights, background }: HeroProps) {
  return (
    <section className={cx(styles.hero, background && styles.withPhoto)} aria-labelledby="hero-title">
      {!background && <div className={styles.backdrop} aria-hidden="true" />}
      <div className={styles.stage}>
        {background && (
          <div className={styles.photo} aria-hidden="true">
            {/* Gentle depth: the photo drifts slightly slower than the page (desktop only, off under reduced motion). */}
            <Parallax className={styles.photoLayer} max={14} factor={0.05}>
              <Image src={background.src} alt="" fill loading="eager" fetchPriority="high" sizes="(max-width: 1023px) 1px, 1100px" quality={90} />
            </Parallax>
          </div>
        )}
        <Container className={styles.grid}>
          <div className={styles.copy}>
            {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
            <h1 id="hero-title" className={styles.title}>
              {renderTitle(title, titleHighlight)}
            </h1>
            {subtitle && <p className={styles.sub}>{subtitle}</p>}
            {(primaryCta || secondaryCta) && (
              <div className={styles.actions}>
                {primaryCta && (
                  <Button href={primaryCta.href} size="lg" arrow>
                    {primaryCta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button href={secondaryCta.href} variant="secondary" size="lg">
                    {secondaryCta.label}
                  </Button>
                )}
              </div>
            )}
          </div>
          {background?.replacesVisual ? (
            // Stacked layouts and right-to-left pages show the photo as the hero visual,
            // cropped to its subject, instead of behind the text.
            <div className={styles.photoInline} aria-hidden="true">
              <Image
                src={background.src}
                alt=""
                fill
                // The band is the LCP element on tablet, mobile and Arabic pages (Next 16: eager, not `priority`).
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1023px) 100vw, 600px"
                quality={90}
              />
            </div>
          ) : (
            visual && (
              <Parallax className={styles.visual}>
                <div className={styles.visualInner}>{visual}</div>
              </Parallax>
            )
          )}
        </Container>
      </div>
      {highlights && highlights.length > 0 && (
        <Container>
          <ul role="list" className={styles.facts}>
            {highlights.map(({ icon: Icon, title: itemTitle, description }) => (
              <li key={itemTitle} className={styles.fact}>
                <span className={styles.factIcon} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span>
                  <span className={styles.factTitle}>{itemTitle}</span>
                  <span className={styles.factText}>{description}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      )}
    </section>
  );
}
