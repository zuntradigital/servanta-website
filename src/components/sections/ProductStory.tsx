import { AlarmClock, BadgeDollarSign, CalendarClock, ClipboardList, TriangleAlert, Users } from "lucide-react";
import { moduleHref } from "@/config/routes";
import { customer360, dashboardQuestions } from "@/content/catalog";
import { journey } from "@/content/journey";
import type { Locale } from "@/i18n/locales";
import { ConnectedSystem } from "./ConnectedSystem";
import { FeatureGrid } from "./FeatureGrid";
import styles from "./ProductStory.module.css";

/** The §10 chain built from the shared journey, each node linking to its module page. */
export function JourneyChain({ locale, label, current }: { locale: Locale; label: string; current?: string }) {
  const nodes = journey
    .filter((stage) => stage.inChain)
    .map((stage) => ({ key: stage.key, label: stage.copy[locale].label, href: moduleHref(locale, stage.module, stage.hash) }));
  return <ConnectedSystem nodes={nodes} label={label} current={current} />;
}

const dashboardIcons = [TriangleAlert, AlarmClock, CalendarClock, ClipboardList, Users, BadgeDollarSign];

/** Dashboard showcase (§12.1): the questions the Command Center answers. */
export function DashboardQuestions({ locale, surface = "surface" }: { locale: Locale; surface?: "surface" | "alt" }) {
  const items = dashboardQuestions[locale].map((item, index) => ({
    icon: dashboardIcons[index],
    title: item.question,
    description: item.answer,
    // "How are customers doing?" is answered by Customer 360.
    href: index === 4 ? moduleHref(locale, "customer-management", "customer-360") : undefined,
  }));
  return <FeatureGrid items={items} surface={surface} />;
}

/** Customer 360 (§14): what one customer record brings together. */
export function Customer360({ locale }: { locale: Locale }) {
  const content = customer360[locale];
  return (
    <div className={styles.c360} data-reveal="scale">
      <p className={styles.hub}>{content.hub}</p>
      <ul role="list" className={styles.spokes}>
        {content.items.map((item) => (
          <li key={item} className={styles.spoke}>
            {item}
          </li>
        ))}
      </ul>
      <p className={styles.note}>{content.note}</p>
    </div>
  );
}

