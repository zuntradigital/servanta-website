# SERVANTA Marketing Website

Next.js 16 (App Router) + React 19 + TypeScript implementation of the SERVANTA public website, built from the
design package (`website/design/01-VISUAL-DESIGN-MASTER-SPECIFICATION.md` and `website/design/mockups/*.html`).
See `DESIGN-ANALYSIS.md` for the page map, component inventory and the gaps in the design.

## Run

```bash
npm install
npm run dev          # http://localhost:3000 → redirects to /en
npm run build && npm start          # production server (next start)
node server.js                      # the exact command Hostinger runs (Passenger startup file)
npm run lint && npm run typecheck   # typecheck runs `next typegen` first, so it works on a fresh checkout
npm run build && npm run test:e2e   # Playwright e2e + axe accessibility checks (desktop + mobile)
```

The site runs as a **Next.js Node.js server** (App Router, server-rendered). `npm run build`
creates the production build in `.next`; `npm start` (or `node server.js`) serves it.
First e2e run: `npx playwright install chromium`; the suite builds and starts the server itself
on port 3100.

**Deploy (Hostinger Node.js):** see [docs/HOSTINGER-DEPLOYMENT.md](docs/HOSTINGER-DEPLOYMENT.md).
In short: upload the project, `npm install`, `npm run build`, and point Hostinger's Node.js app
at `server.js` as the startup file.

Copy `.env.example` to `.env.local` to configure the site URL, forms endpoint and pricing API.

## Structure

```
src/
  app/[locale]/        one folder per route (/en/..., /ar/...); layout = header + footer
  components/
    ui/                primitives: Button, TextLink, Section, Container, Badge, Alert, Skeleton, Breadcrumbs…
    layout/            SiteHeader, ResourcesMenu, MobileNav, LanguageSwitcher, SiteFooter, Logo
    sections/          Hero, PageIntro, ImageText, FeatureGrid, Steps, Statistics, LogoCloud,
                       FaqAccordion, CtaBand, ComparisonTable, RichText, LegalPage
    pricing/ forms/ blog/ visuals/ seo/ errors/
  config/              brand.ts (all brand values), routes.ts (route catalog + locale availability)
  content/             all page copy, FAQs, plans, blog posts — edit here, not in components
  i18n/                locales + chrome strings (EN/AR)
  lib/                 metadata, pricing fetch, form submission
  app/globals.css      design tokens (colors, type scale, spacing, radius, motion)
```

## Things to replace before launch

| Item | Where |
|---|---|
| Logo: official artwork `assets/servanta-logo.gif`, served unmodified (transparent GIF, `unoptimized`); favicon is its symbol, scaled onto a transparent square | `components/layout/Logo.tsx`, `app/icon.png`, `app/apple-icon.png` |
| Contact email / phone / address / social links | `config/brand.ts` |
| Customer logos, real statistics (placeholders hidden: `showContentPlaceholders=false`, WEB-MKT-SRS-002 §9) | `content/home.ts`, `config/brand.ts` |
| Capability statuses (every module and feature carries one; verify with the Product Owner) | `content/catalog.ts`, `docs/srs-v2/02_PRODUCT_CAPABILITY_MATRIX.md` |
| Plans, prices, features, limits | Pricing API via `PRICING_API_BASE_URL` (`lib/pricing.ts`, contract in `lib/pricing-types.ts`); until it exists, the SRS seed in `content/pricing.ts` |
| Forms endpoint. Unset: production builds show "This form isn't connected yet" and send nothing; `next dev` simulates success | `NEXT_PUBLIC_FORMS_ENDPOINT` |
| Analytics provider (none loaded; events fire only after consent) | register an adapter in `lib/analytics.ts`, add its origins to the CSP in `next.config.ts` |
| Testimonials (section hidden while empty) | `content/testimonials.ts` |
| Site-wide announcement (off) | `config/announcement.ts` |
| Redirect rules | `config/redirects.ts` |
| Share image (generated wordmark card) | `app/[locale]/opengraph-image.tsx` |
| Sample blog posts | `content/blog.ts` |
| Legal text: Privacy, Terms, Cookies, Refund Policy (placeholder bodies) | `content/pages/legal.ts` |
| Arabic copy review (all pages, drafted for this build) | `content/**`, `i18n/dictionaries.ts` |

## Localization

Every route is `/en/...` or `/ar/...` (`src/proxy.ts` redirects unprefixed URLs using cookie → Accept-Language → default).
A page is served only in the locales listed for it in `config/routes.ts`; every page and sample post now exists in English and Arabic.
URL slugs stay in English in both locales. The locale cookie is only written on real page visits (not prefetches) and when the
visitor uses the language switcher.

## Behaviour notes

- **Forms**: Contact (`contact_us`), Request a Demo (`request_demo`), Contact Sales (`contact_sales`, at `/contact-sales`; the old `/request-demo?type=sales` URL redirects there)
  and Newsletter (`newsletter`, on the blog) all POST `{ form_key, locale, page_url, attribution, values }` to the forms endpoint.
- **Consent**: a cookie banner stores `servanta_consent`; analytics is off until accepted; "Cookie settings" in the footer reopens it.
- **Analytics events** (16-ANALYTICS): `page_view`, `cta_click` (any `[data-cta]`), `contact_form_submit`, `demo_request_submit`,
  `blog_article_view`. `lead_conversion` belongs to the backend.
- **Blog**: filter and page are URL state (`/blog?category=operations&page=2`).
- **Security headers**: CSP, HSTS (production), X-Frame-Options, Referrer-Policy, Permissions-Policy, set in `next.config.ts`.
- **Design language**: follows the design reference supplied on 2026-09-28, anchored to the official logo. Ice-blue
  backgrounds (`#F5F9FD`, `#EEF5FC`), deep navy ink `#0B2551`, navy buttons `#0A3470`, one brand blue `#1A63C7`
  (`#1E6FD9` for icons) used sparingly, deep navy CTA band `#002954` and footer `#021830`. Quiet cards (10px radius,
  hairline border, soft shadow), squared corners rather than pills, blue uppercase eyebrows, subtle fade/rise entrances,
  card lift on hover and a small hero parallax, all off under reduced motion. All tokens live in `src/app/globals.css`;
  every text pairing meets WCAG AA. The pre-redesign version is `servanta-website-before-redesign.zip`.
- **Hero background photo**: currently OFF (WEB-MKT-SRS-002 §12, §59: its screen showed invented figures and a module the product lacks); the hero shows the labelled illustrative Command Center. `public/hero-background.png`, configured in `src/config/hero.ts`. On desktop (1280px and up,
  English) it sits behind the hero at its natural aspect ratio with feathered edges and no colour overlay; on narrower
  screens and Arabic pages it becomes the hero visual, cropped to the devices.
  Breakpoints: 1200px+ background sized to the hero height and anchored to the right edge; 1024–1199px and
  Arabic desktop a full-bleed column; below 1024px a full-width band under the buttons (16:9 tablet, 4:3 mobile). `replacesVisual: true` hides the HTML
  Command Center preview on the Home hero, since the photo shows the product; set it to false to bring the preview back.
- **Customer logos**: the trust band on Home is hidden until real logos are added to `trust.logos` in `src/content/home.ts`.
