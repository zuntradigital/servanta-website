import type { Metadata } from "next";
import { LeadPage } from "@/components/forms/LeadPage";
import { getLeadPagesContent } from "@/content/pages/lead-pages";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";

type Props = PageProps<"/[locale]/contact-sales">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await metaLocale(params);
  const copy = getLeadPagesContent(locale).sales;
  return pageMetadata({ locale, route: "contactSales", title: copy.metaTitle, description: copy.metaDescription });
}

/** Contact Sales (WEB-MKT-SRS-002 §123). `?plan={code}` preselects a plan from the pricing page. */
export default async function ContactSalesPage({ params, searchParams }: Props) {
  const locale = await resolveLocale(params, "contactSales");
  const { plan } = await searchParams;
  return <LeadPage locale={locale} variant="sales" plan={plan} />;
}
