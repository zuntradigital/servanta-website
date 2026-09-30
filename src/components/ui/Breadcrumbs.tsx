import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import styles from "./Breadcrumbs.module.css";

type Crumb = { label: string; href: string };

/** Visual breadcrumbs plus BreadcrumbList structured data (spec §17). */
export function Breadcrumbs({ items, label }: { items: Crumb[]; label: string }) {
  return (
    <>
      <nav aria-label={label} className={styles.nav}>
        <ol role="list" className={styles.list}>
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={item.href} className={styles.item}>
                {last ? (
                  <span aria-current="page" className={styles.current}>
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                    <ChevronRight size={14} className="flip-rtl" aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <BreadcrumbJsonLd items={items.map((i) => ({ name: i.label, url: i.href }))} />
    </>
  );
}
