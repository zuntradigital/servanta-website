/**
 * Redirect rules (18-WEBSITE-REDIRECTS-SITEMAP-SRS FR-WEB-021), applied at
 * build time by next.config.ts. The spec puts a redirects manager in the
 * admin dashboard; until that exists, add rules here.
 *
 * `source` and `destination` are full paths including the locale prefix,
 * e.g. { source: "/en/old-pricing", destination: "/en/pricing", permanent: true }.
 * `permanent: true` sends 308 (treated like 301), false sends 307 (like 302).
 */
export type RedirectRule = { source: string; destination: string; permanent: boolean };

/** Legal pages moved under the Legal Center (MOD-LEGAL-CENTER-WEB §5). */
const legalMoves: Array<[string, string]> = [
  ["/privacy", "/legal/privacy"],
  ["/terms", "/legal/terms"],
  ["/cookies", "/legal/cookies"],
  ["/refund-policy", "/legal/refunds-cancellation"],
];

export const redirectRules: RedirectRule[] = legalMoves.flatMap(([from, to]) =>
  ["en", "ar"].map((locale) => ({ source: `/${locale}${from}`, destination: `/${locale}${to}`, permanent: true })),
);
