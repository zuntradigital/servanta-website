import logoImage from "@/assets/servanta-logo.gif";
import { brand, siteUrl } from "@/config/brand";
import type { Locale } from "@/i18n/locales";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const sameAs = Object.values(brand.social).filter(Boolean);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: brand.name,
        legalName: brand.legalEntityName,
        url: siteUrl,
        logo: new URL(logoImage.src, siteUrl).toString(),
        description: brand.defaultDescription[locale],
        ...(sameAs.length ? { sameAs } : {}),
      }}
    />
  );
}

/** WebSite (WEB-MKT-SRS-002 §73), with the languages the site is published in. */
export function WebSiteJsonLd({ locale }: { locale: Locale }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: brand.name,
        url: `${siteUrl}/${locale}`,
        inLanguage: locale,
        publisher: { "@type": "Organization", name: brand.name, legalName: brand.legalEntityName },
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: Array<{ question: string; answer: string }> }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteUrl}${item.url}`,
        })),
      }}
    />
  );
}

export function ArticleJsonLd(props: { title: string; description: string; url: string; datePublished: string; author: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.title,
        description: props.description,
        url: `${siteUrl}${props.url}`,
        datePublished: props.datePublished,
        author: { "@type": "Person", name: props.author },
        publisher: { "@type": "Organization", name: brand.name },
      }}
    />
  );
}
