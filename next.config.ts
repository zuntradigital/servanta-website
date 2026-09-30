import type { NextConfig } from "next";
import { videoEmbedHosts } from "./src/config/embeds";
import { redirectRules } from "./src/config/redirects";

const isDev = process.env.NODE_ENV !== "production";

function origin(url: string | undefined): string | null {
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
 * would force every page to render per request). No third-party script
 * origins are allowed: no analytics provider is configured yet. When one
 * is, add its origins here.
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

const nextConfig: NextConfig = {
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
