import type { Testimonial as TestimonialData } from "@/content/testimonials";
import type { Locale } from "@/i18n/locales";
import styles from "./Testimonial.module.css";

/** Testimonial (spec §9): quote with attribution. Renders nothing without real quotes. */
export function Testimonials({ items, locale, heading }: { items: TestimonialData[]; locale: Locale; heading: string }) {
  if (items.length === 0) return null;
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.inner}>
        <h2 id="testimonials-heading" className={styles.heading}>
          {heading}
        </h2>
        <ul role="list" className={styles.list}>
          {items.map((item) => (
            <li key={`${item.name}-${item.company}`}>
              <figure className={styles.card}>
                <blockquote className={styles.quote}>
                  <p>{item.quote[locale] || item.quote.en}</p>
                </blockquote>
                <figcaption className={styles.attribution}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.role}>
                    {item.role[locale] || item.role.en}, {item.company}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
