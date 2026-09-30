import type { Locale } from "@/i18n/locales";

/**
 * Customer testimonials (spec §9 Testimonial). None exist yet, and none are
 * invented: the Testimonial section renders nothing while this list is empty.
 * Add only real, approved quotes.
 */
export type Testimonial = {
  quote: Record<Locale, string>;
  name: string;
  role: Record<Locale, string>;
  company: string;
};

export const testimonials: Testimonial[] = [];
