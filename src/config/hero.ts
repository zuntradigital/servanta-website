/**
 * Home hero background photo (supplied by the client, 2026-09-28).
 *
 * The file lives in `public/`. On desktop (left-to-right) it sits behind the
 * hero at its natural aspect ratio with feathered edges; on narrower screens
 * and Arabic pages it becomes the hero visual. Cropping per breakpoint lives
 * in Hero.module.css (.photoInline) and keeps the laptop and phone in frame.
 *
 * `replacesVisual`: the photo already shows the product on devices, so the
 * in-page Command Center preview is not drawn on top of it. Set to false to
 * bring the preview back (it would then cover the laptop in the photo).
 * Set `heroBackground` to null to return to the plain brand background.
 */
export type HeroBackground = { src: string; replacesVisual?: boolean };

/**
 * On at the client's request (2026-09-29). Note for the SRS review: the photo's
 * screen shows sample figures and a "Projects" menu (WEB-MKT-SRS-002 §12.2, §59),
 * see docs/srs-v2/10_FINAL_CLAIMS_REVIEW.md.
 */
export const heroBackground = {
  src: "/hero-background.png",
  replacesVisual: true,
} as HeroBackground | null;
