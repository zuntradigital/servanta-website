"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/locales";
import { cx } from "@/lib/cx";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { isActivePath, isHeaderGroup, type HeaderLabels, type HeaderLink, type HeaderNav } from "./SiteHeader";
import styles from "./MobileNav.module.css";

type MobileNavProps = {
  id: string;
  open: boolean;
  onClose: () => void;
  locale: Locale;
  homeHref: string;
  demoHref: string;
  salesHref: string;
  nav: HeaderNav;
  labels: HeaderLabels;
  pathname: string;
};

const noopSubscribe = () => () => {};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full-screen off-canvas menu for mobile (spec §10): slides from the
 * logical-end edge, traps focus, locks page scroll, closes on Escape.
 */
export function MobileNav({ id, open, onClose, locale, homeHref, demoHref, salesHref, nav, labels, pathname }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className={cx(styles.overlay, open && styles.open)} aria-hidden={!open} inert={!open}>
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label={labels.primaryNav}
        className={styles.panel}
        onKeyDown={onKeyDown}
      >
        <div className={styles.top}>
          <Logo href={homeHref} />
          <button ref={closeRef} type="button" className={styles.close} aria-label={labels.closeMenu} onClick={onClose}>
            <X size={24} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <nav className={styles.body} aria-label={labels.primaryNav}>
          <ul role="list" className={styles.list}>
            {nav.items
              .filter((item): item is HeaderLink => !isHeaderGroup(item))
              .map((link) => {
                const active = isActivePath(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link href={link.href} className={cx(styles.link, active && styles.active)} aria-current={active ? "page" : undefined} onClick={onClose}>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
          </ul>

          {nav.items.filter(isHeaderGroup).map((group) => (
            <div key={group.label}>
              <p className={styles.groupLabel}>{group.label}</p>
              <ul role="list" className={styles.subList}>
                {group.items.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cx(styles.subLink, active && styles.active)}
                        aria-current={active ? "page" : undefined}
                        onClick={onClose}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className={styles.language}>
            <LanguageSwitcher locale={locale} label={labels.language} variant="drawer" onNavigate={onClose} />
          </div>
        </nav>

        <div className={styles.footer}>
          <Button href={salesHref} size="lg" variant="secondary" fullWidth onClick={onClose}>
            {labels.contactSales}
          </Button>
          <Button href={demoHref} size="lg" fullWidth onClick={onClose}>
            {labels.requestDemo}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
