// @ts-check

/**
 * Next.js configuration.
 *
 * This file is intentionally plain JavaScript (`.mjs`), not TypeScript, and it
 * imports nothing from the project. Loading a `next.config.ts` (or a config that
 * imports project `.ts` files) requires Next's SWC/TypeScript transpiler, and on
 * some hosts (e.g. Hostinger's build container, whose glibc is older than the
 * `GLIBC_2.29` that Next 16's native SWC binary needs) that transpiler falls back
 * to WASM and fails to compile the config — the build then dies with
 * "Failed to load next.config.ts". A self-contained `.mjs` is loaded directly by
 * Node with no transpilation, so the build works regardless of the SWC binary.
 *
 * The two data sets below are duplicated from `src/config/embeds.ts` and
 * `src/config/redirects.ts` (which stay the source of truth for the app itself).
 * Keep them in sync — they are small and rarely change.
 */

// Mirror of src/config/embeds.ts (Video component + CSP frame-src).
const videoEmbedHosts = ["www.youtube-nocookie.com", "player.vimeo.com"];

// Mirror of src/config/redirects.ts: legal pages moved under the Legal Center.
const legalMoves = [
  ["/privacy", "/legal/privacy"],
  ["/terms", "/legal/terms"],
  ["/cookies", "/legal/cookies"],
  ["/refund-policy", "/legal/refunds-cancellation"],
];
const redirectRules = legalMoves.flatMap(([from, to]) =>
  ["en", "ar"].map((locale) => ({ source: `/${locale}${from}`, destination: `/${locale}${to}`, permanent: true })),
);

const isDev = process.env.NODE_ENV !== "production";

/** @param {string | undefined} url */
function origin(url) {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

/**
 * Content-Security-Policy (15-WEBSITE-SECURITY-SRS). Pages are statically
 * rendered, so Next's inline bootstrap scripts need 'unsafe-inline' (nonces
 * would force every page to render per request). No third-party script origins
 * are allowed: no analytics provider is configured yet. When one is, add its
 * origins here.
 */
const connectSources = ["'self'", origin(process.env.NEXT_PUBLIC_FORMS_ENDPOINT), isDev ? "ws:" : null].filter(Boolean);

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src ${connectSources.join(" ")}`,
  `frame-src ${videoEmbedHosts.map((host) => `https://${host}`).join(" ")}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
]
  .filter(Boolean)
  .join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // HSTS only matters over HTTPS; browsers ignore it on plain-HTTP localhost.
  ...(isDev ? [] : [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // 90 is used for the logo so its edges stay crisp.
  images: { qualities: [75, 90] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return redirectRules;
  },
};

export default nextConfig;
