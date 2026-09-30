"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";
import { getConsent, setConsent, subscribeConsent, subscribeConsentOpen } from "@/lib/consent";
import styles from "./CookieConsent.module.css";

type CookieConsentProps = {
  labels: Dictionary["consent"];
  policyHref: string;
};

const noop = () => () => {};

/**
 * Cookie banner (16-WEBSITE-ANALYTICS-SRS BR-WEB-031). Shown until the
 * visitor chooses; the footer's "Cookie settings" reopens it. Analytics is
 * off by default and the two choices carry equal visual weight. Not in the
 * mockups, so it reuses the existing button, type and surface tokens.
 */
export function CookieConsent({ labels, policyHref }: CookieConsentProps) {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const [reopened, setReopened] = useState(false);
  const [view, setView] = useState<"summary" | "preferences">("summary");
  const [analytics, setAnalytics] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const bodyId = useId();

  useEffect(
    () =>
      subscribeConsentOpen(() => {
        setAnalytics(getConsent()?.analytics ?? false);
        setView("preferences");
        setReopened(true);
        requestAnimationFrame(() => panelRef.current?.focus());
      }),
    [],
  );

  const visible = mounted && (consent === null || reopened);
  if (!visible) return null;

  const decide = (choice: boolean) => {
    setConsent({ analytics: choice });
    setReopened(false);
    setView("summary");
  };

  return (
    <div
      ref={panelRef}
      className={styles.banner}
      role="region"
      aria-labelledby={titleId}
      aria-describedby={bodyId}
      tabIndex={-1}
      data-testid="cookie-banner"
    >
      <div className={styles.inner}>
        {view === "summary" ? (
          <>
            <div className={styles.copy}>
              <h2 id={titleId} className={styles.title}>
                {labels.title}
              </h2>
              <p id={bodyId} className={styles.body}>
                {labels.body} <Link href={policyHref}>{labels.policyLink}</Link>
              </p>
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles.manage} onClick={() => setView("preferences")}>
                {labels.manage}
              </button>
              <Button variant="secondary" onClick={() => decide(false)}>
                {labels.reject}
              </Button>
              <Button variant="secondary" onClick={() => decide(true)}>
                {labels.accept}
              </Button>
            </div>
          </>
        ) : (
          <form
            className={styles.preferences}
            onSubmit={(event) => {
              event.preventDefault();
              decide(analytics);
            }}
          >
            <div className={styles.copy}>
              <h2 id={titleId} className={styles.title}>
                {labels.dialogLabel}
              </h2>
              <p id={bodyId} className={styles.body}>
                {labels.body} <Link href={policyHref}>{labels.policyLink}</Link>
              </p>
            </div>
            <ul role="list" className={styles.categories}>
              <li className={styles.category}>
                <div>
                  <p className={styles.categoryTitle}>{labels.necessaryTitle}</p>
                  <p className={styles.categoryBody}>{labels.necessaryBody}</p>
                </div>
                <span className={styles.always}>{labels.alwaysOn}</span>
              </li>
              <li className={styles.category}>
                <div>
                  <label htmlFor={`${titleId}-analytics`} className={styles.categoryTitle}>
                    {labels.analyticsTitle}
                  </label>
                  <p className={styles.categoryBody}>{labels.analyticsBody}</p>
                </div>
                <input
                  id={`${titleId}-analytics`}
                  type="checkbox"
                  role="switch"
                  className={styles.switch}
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                />
              </li>
            </ul>
            <div className={styles.actions}>
              {!reopened && (
                <button type="button" className={styles.manage} onClick={() => setView("summary")}>
                  {labels.back}
                </button>
              )}
              <Button type="submit" variant="secondary">
                {labels.save}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
