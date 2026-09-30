"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Info, X } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { cx } from "@/lib/cx";
import styles from "./Banner.module.css";

export type BannerTone = "info" | "success" | "warning";

export type BannerProps = {
  /** Stable id; a dismissed banner stays hidden for this visitor. */
  id: string;
  message: string;
  tone?: BannerTone;
  link?: { label: string; href: string };
  dismissible?: boolean;
  dismissLabel?: string;
  className?: string;
};

const icons = { info: Info, success: CheckCircle2, warning: AlertTriangle };
const storageKey = (id: string) => `servanta_banner_dismissed:${id}`;

function readDismissed(id: string): boolean {
  try {
    return localStorage.getItem(storageKey(id)) === "1";
  } catch {
    return false;
  }
}

/**
 * Banner (spec §9): icon + message + optional link in a slim full-width
 * strip; dismissible when configured, with the dismiss control at the
 * logical end. role="status" for info/success, role="alert" for warnings.
 */
export function Banner({ id, message, tone = "info", link, dismissible, dismissLabel = "Dismiss", className }: BannerProps) {
  const storedDismissed = useSyncExternalStore(
    () => () => {},
    () => readDismissed(id),
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);
  if (dismissed || (dismissible && storedDismissed)) return null;

  const Icon = icons[tone];
  return (
    <div role={tone === "warning" ? "alert" : "status"} className={cx(styles.banner, styles[tone], className)}>
      <div className={styles.inner}>
        <Icon className={styles.icon} size={18} strokeWidth={1.75} aria-hidden="true" />
        <p className={styles.message}>
          {message}
          {link && (
            <>
              {" "}
              <Link href={link.href} className={styles.link} data-cta="">
                {link.label}
                <ArrowRight size={14} className="flip-rtl" aria-hidden="true" />
              </Link>
            </>
          )}
        </p>
        {dismissible && (
          <button
            type="button"
            className={styles.dismiss}
            aria-label={dismissLabel}
            onClick={() => {
              try {
                localStorage.setItem(storageKey(id), "1");
              } catch {
                // Dismissal still applies for this page view.
              }
              setDismissed(true);
            }}
          >
            <X size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
