import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle, Mail, MapPin, MessagesSquare, Phone, PlayCircle } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageIntro } from "@/components/sections/PageIntro";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { brand } from "@/config/brand";
import { href } from "@/config/routes";
import { getForms } from "@/content/pages/forms";
import { getLeadPagesContent } from "@/content/pages/lead-pages";
import { getDictionary } from "@/i18n/dictionaries";
import { metaLocale, resolveLocale } from "@/lib/page";
import { pageMetadata } from "@/lib/metadata";
import styles from "./contact.module.css";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const locale = await metaLocale(params);
  const copy = getLeadPagesContent(locale).contact;
  return pageMetadata({ locale, route: "contact", title: copy.metaTitle, description: copy.metaDescription });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = await resolveLocale(params, "contact");
  const { email, phone, address } = brand.contact;
  const copy = getLeadPagesContent(locale).contact;
  const form = getForms(locale).contact;
  const dict = getDictionary(locale);
  const localAddress = address[locale] || address.en;
  const socials = Object.entries(brand.social).filter(([, url]) => Boolean(url));

  return (
    <>
      <PageIntro title={copy.title} subtitle={copy.subtitle} />

      <Section tone="alt" density="dense" ariaLabel={copy.sectionLabel}>
        <Container className={styles.layout}>
          <div className={styles.formCol}>
            <h2 className={styles.heading}>{copy.formHeading}</h2>
            <LeadForm formKey="contact_us" fields={form.fields} messages={form.messages} privacyHref={href(locale, "privacy")} locale={locale} />
          </div>

          {/* Contact details come from brand settings; empty values are not shown. */}
          <aside className={styles.info} aria-labelledby="contact-info-heading">
            <h2 id="contact-info-heading" className={styles.infoHeading}>
              {copy.infoHeading}
            </h2>
            <ul role="list" className={styles.infoList}>
              {email && (
                <li>
                  <Mail size={18} strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className={styles.infoLabel}>{copy.email}</p>
                    <a href={`mailto:${email}`} dir="ltr">
                      {email}
                    </a>
                  </div>
                </li>
              )}
              {phone && (
                <li>
                  <Phone size={18} strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className={styles.infoLabel}>{copy.phone}</p>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} dir="ltr">
                      {phone}
                    </a>
                  </div>
                </li>
              )}
              {localAddress && (
                <li>
                  <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className={styles.infoLabel}>{copy.address}</p>
                    <p>{localAddress}</p>
                  </div>
                </li>
              )}
              <li>
                <PlayCircle size={18} strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className={styles.infoLabel}>{copy.demoPrompt}</p>
                  <Link href={href(locale, "requestDemo")} className={styles.infoLink} data-cta="">
                    {dict.cta.requestDemo} <ArrowRight size={14} className="flip-rtl" aria-hidden="true" />
                  </Link>
                </div>
              </li>
              <li>
                <MessagesSquare size={18} strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className={styles.infoLabel}>{copy.salesPrompt}</p>
                  <Link href={href(locale, "contactSales")} className={styles.infoLink} data-cta="">
                    {dict.cta.contactSales} <ArrowRight size={14} className="flip-rtl" aria-hidden="true" />
                  </Link>
                </div>
              </li>
              <li>
                <HelpCircle size={18} strokeWidth={1.75} aria-hidden="true" />
                <div>
                  <p className={styles.infoLabel}>{copy.faqPrompt}</p>
                  <Link href={href(locale, "faq")} className={styles.infoLink}>
                    {copy.faqLink} <ArrowRight size={14} className="flip-rtl" aria-hidden="true" />
                  </Link>
                </div>
              </li>
            </ul>
            {socials.length > 0 && (
              <ul role="list" className={styles.socials} aria-label={copy.socialLabel}>
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} rel="noopener noreferrer" target="_blank">
                      {name === "x" ? "X" : name.charAt(0).toUpperCase() + name.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        </Container>
      </Section>
    </>
  );
}
