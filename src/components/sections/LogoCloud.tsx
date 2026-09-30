/* eslint-disable @next/next/no-img-element -- partner logos are CMS-managed media of unknown dimensions */
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import type { LogoItem } from "@/content/types";
import styles from "./LogoCloud.module.css";

type LogoCloudProps = {
  label: string;
  logos: LogoItem[];
  /** Number of neutral placeholder slots to show while no logos exist. */
  placeholderCount?: number;
  placeholderNote?: string;
};

/**
 * Logo Cloud / Trust Strip (spec §5.3). Renders real logos when supplied;
 * otherwise neutral, labelled placeholder slots (Design Gap DG-003).
 */
export function LogoCloud({ label, logos, placeholderCount = 0, placeholderNote }: LogoCloudProps) {
  const showPlaceholders = logos.length === 0 && placeholderCount > 0;
  if (!logos.length && !showPlaceholders) return null;

  const logoItem = (logo: LogoItem) =>
    logo.href ? (
      <a href={logo.href} rel="noopener noreferrer" target="_blank">
        <img src={logo.src} alt={logo.name} loading="lazy" />
      </a>
    ) : (
      <img src={logo.src} alt={logo.name} loading="lazy" />
    );

  return (
    <Section tone="band" density="dense" ariaLabel={label} className={styles.band}>
      <Container>
        <Eyebrow className={styles.label}>{label}</Eyebrow>
        {showPlaceholders ? (
          <ul role="list" className={styles.list}>
            {Array.from({ length: placeholderCount }, (_, index) => (
              <li key={index} className={styles.slot} aria-hidden="true" />
            ))}
          </ul>
        ) : (
          // Seamless infinite horizontal loop: the same logos, in order, rendered
          // twice so the track can scroll by exactly one set with no visible jump.
          <div className={styles.marquee}>
            <div className={styles.marqueeTrack}>
              <ul role="list" className={styles.set}>
                {logos.map((logo) => (
                  <li key={logo.name} className={styles.logo}>
                    {logoItem(logo)}
                  </li>
                ))}
              </ul>
              <ul aria-hidden="true" className={styles.set}>
                {logos.map((logo) => (
                  <li key={`clone-${logo.name}`} className={styles.logo}>
                    {logoItem(logo)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {showPlaceholders && placeholderNote && <p className={styles.note}>{placeholderNote}</p>}
      </Container>
    </Section>
  );
}
