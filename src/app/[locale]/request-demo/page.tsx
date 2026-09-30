import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { LeadPage } from "@/components/forms/LeadPage";
import { href } from "@/config/routes";
import { getLeadPagesContent } from "@/content/pages/lead-pages";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";

type Props = PageProps<"/[locale]/request-demo">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await metaLocale(params);
  const copy = getLeadPagesContent(locale).demo;
  return pageMetadata({ locale, route: "requestDemo", title: copy.metaTitle, description: copy.metaDescription });
}

/** Request a Demo. The former `?type=sales` variant now lives at /contact-sales and redirects there. */
export default async function RequestDemoPage({ params, searchParams }: Props) {
  const locale = await resolveLocale(params, "requestDemo");
  const { type, plan } = await searchParams;
  if (type === "sales") {
    const query = typeof plan === "string" ? `?plan=${encodeURIComponent(plan)}` : "";
    permanentRedirect(`${href(locale, "contactSales")}${query}`);
  }
  return <LeadPage locale={locale} variant="demo" />;
}
