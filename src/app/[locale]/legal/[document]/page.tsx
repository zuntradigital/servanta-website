import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/sections/LegalPage";
import { getLegalDoc, getLegalEntry, publicLegalDocuments } from "@/content/pages/legal";
import { locales } from "@/i18n/locales";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";

type Props = PageProps<"/[locale]/legal/[document]">;

/** Every public Legal Center document gets a page; new catalog entries need no code change (§5). */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    publicLegalDocuments()
      .filter((doc) => doc.key !== "legal_contact")
      .map((doc) => ({ locale, document: doc.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await metaLocale(params);
  const entry = getLegalEntry((await params).document);
  if (!entry) return {};
  const doc = getLegalDoc(locale, entry);
  return pageMetadata({ locale, route: "legal", path: `/legal/${entry.slug}`, title: doc.title, description: doc.description });
}

export default async function LegalDocumentPage({ params }: Props) {
  const locale = await resolveLocale(params, "legal");
  const entry = getLegalEntry((await params).document);
  if (!entry) notFound();
  return <LegalPage doc={getLegalDoc(locale, entry)} locale={locale} />;
}
