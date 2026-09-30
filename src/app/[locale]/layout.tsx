import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { AnalyticsController } from "@/components/analytics/AnalyticsController";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader, type HeaderNav } from "@/components/layout/SiteHeader";
import { RevealController } from "@/components/ui/Reveal";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { brand, siteUrl } from "@/config/brand";
import { href } from "@/config/routes";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localeDirection, locales } from "@/i18n/locales";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : "en";
  return {
    metadataBase: new URL(siteUrl),
    title: { default: brand.name, template: `%s — ${brand.name}` },
    description: brand.defaultDescription[lang],
    applicationName: brand.name,
  };
}

export const viewport: Viewport = {
  themeColor: "#001F3B",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  // Main navigation (WEB-MKT-SRS-002 §7.1), nested per §81. Features is the module catalog
  // ("Services / Modules"); Request Demo and Contact Sales sit with the header actions.
  const nav: HeaderNav = {
    items: [
      {
        label: dict.nav.platform,
        items: [
          { label: dict.nav.platformOverview, href: href(locale, "platform") },
          { label: dict.nav.howItWorks, href: href(locale, "howItWorks") },
          { label: dict.nav.security, href: href(locale, "security") },
        ],
      },
      { label: dict.nav.features, href: href(locale, "features") },
      { label: dict.nav.solutions, href: href(locale, "solutions") },
      { label: dict.nav.pricing, href: href(locale, "pricing") },
      {
        label: dict.nav.resources,
        items: [
          { label: dict.nav.allResources, href: href(locale, "resources") },
          { label: dict.nav.blog, href: href(locale, "blog") },
          { label: dict.nav.faq, href: href(locale, "faq") },
        ],
      },
    ],
  };

  return (
    // Browser extensions (e.g. a focus-visible polyfill adding data-js-focus-visible) edit <html>
    // before React hydrates; this silences that one-level attribute mismatch only.
    <html lang={locale} dir={localeDirection(locale)} data-scroll-behavior="smooth" className={`${inter.variable} ${plexArabic.variable}`} suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">
          {dict.skipToContent}
        </a>
        <AnnouncementBar locale={locale} dismissLabel={dict.common.dismiss} />
        <SiteHeader
          locale={locale}
          homeHref={href(locale, "home")}
          demoHref={href(locale, "requestDemo")}
          salesHref={href(locale, "contactSales")}
          nav={nav}
          labels={{
            primaryNav: dict.nav.primaryLabel,
            openMenu: dict.nav.openMenu,
            closeMenu: dict.nav.closeMenu,
            language: dict.language.switchTo,
            requestDemo: dict.cta.requestDemo,
            contactSales: dict.nav.contactSales,
          }}
        />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        <RevealController />
        <CookieConsent labels={dict.consent} policyHref={href(locale, "cookies")} />
        <AnalyticsController locale={locale} />
        <OrganizationJsonLd locale={locale} />
        <WebSiteJsonLd locale={locale} />
      </body>
    </html>
  );
}
