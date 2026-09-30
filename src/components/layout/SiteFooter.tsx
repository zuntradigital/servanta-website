import Image from "next/image";
import Link from "next/link";
import footerLogo from "@/assets/servanta-logo-share.png";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { brand } from "@/config/brand";
import { href, type RouteKey } from "@/config/routes";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/locales";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = { locale: Locale; dict: Dictionary };

type FooterColumn = { title: string; links: Array<{ key: RouteKey; label: string }> };

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const { nav, footer } = dict;

  // Footer columns (spec §10): Product, Company, Resources, Legal.
  const columns: FooterColumn[] = [
    {
      title: footer.product,
      links: [
        { key: "platform", label: nav.platform },
        { key: "features", label: nav.features },
        { key: "solutions", label: nav.solutions },
        { key: "pricing", label: nav.pricing },
        { key: "howItWorks", label: footer.howItWorks },
        { key: "security", label: footer.security },
      ],
    },
    {
      title: footer.company,
      links: [
        { key: "about", label: footer.about },
        { key: "services", label: footer.services },
        { key: "contact", label: footer.contact },
        { key: "contactSales", label: footer.contactSales },
      ],
    },
    {
      title: footer.resources,
      links: [
        { key: "resources", label: nav.allResources },
        { key: "blog", label: nav.blog },
        { key: "faq", label: nav.faq },
      ],
    },
    {
      title: footer.legal,
      links: [
        { key: "legal", label: footer.legalCenter },
        { key: "privacy", label: footer.privacy },
        { key: "terms", label: footer.terms },
        { key: "cookies", label: footer.cookies },
        { key: "refundPolicy", label: footer.refundPolicy },
      ],
    },
  ];

  const socialEntries = Object.entries(brand.social).filter(([, url]) => Boolean(url));

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            {/* Footer logo: the brand's transparent RGBA master (same artwork as the header),
                shown white on the dark footer via a CSS filter — the artwork is unchanged.
                --logo-src lets the hover glint be masked to the mark's own shape. */}
            <Link
              href={href(locale, "home")}
              className={styles.logo}
              data-reveal="scale"
              style={{ ["--logo-src" as string]: `url(${footerLogo.src})` }}
            >
              <Image src={footerLogo} alt={`${brand.name} home`} className={styles.logoImage} unoptimized draggable={false} />
            </Link>
            <p className={styles.tagline} data-reveal="fade" style={{ ["--reveal-index" as string]: 1 }}>{brand.tagline[locale] || brand.tagline.en}</p>
          </div>

          {columns.map((column, index) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className={styles.column}
              data-reveal="fade"
              style={{ ["--reveal-index" as string]: index + 1 }}
            >
              <h2 className={styles.heading}>{column.title}</h2>
              <ul role="list" className={styles.links}>
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link href={href(locale, link.key)} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
                {column.title === footer.legal && (
                  <li>
                    <CookieSettingsButton label={dict.consent.settings} className={styles.link} />
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom} data-reveal="fade">
          {socialEntries.length > 0 && (
            <ul role="list" className={styles.social} aria-label={footer.social}>
              {socialEntries.map(([name, url]) => (
                <li key={name}>
                  <a href={url} className={styles.link} rel="noopener noreferrer" target="_blank">
                    {name === "x" ? "X" : name.charAt(0).toUpperCase() + name.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {/* Copyright and credits exactly as supplied by the client, identical on both locales.
              Latin and Arabic runs are isolated so punctuation stays in place in LTR and RTL. */}
          <p>
            <span dir="ltr">© 2026 SERVANTA .</span> <span dir="rtl" lang="ar">جميع الحقوق محفوظة.</span>
          </p>
          <p dir="rtl" lang="ar">
            تصميم وتطوير{" "}
            <a href="https://zyntra.ltd/en/" className={styles.credit}>
              <span dir="ltr" lang="en">
                ZYNTRA Digital
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
