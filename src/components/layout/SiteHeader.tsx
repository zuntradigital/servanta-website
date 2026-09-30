"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/i18n/locales";
import { cx } from "@/lib/cx";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ResourcesMenu } from "./ResourcesMenu";
import styles from "./SiteHeader.module.css";

export type HeaderLink = { label: string; href: string };
export type HeaderGroup = { label: string; items: HeaderLink[] };
/** Top-level entries in order: plain links and dropdown groups (WEB-MKT-SRS-002 §7.1, §81). */
export type HeaderNav = { items: Array<HeaderLink | HeaderGroup> };

export function isHeaderGroup(item: HeaderLink | HeaderGroup): item is HeaderGroup {
  return "items" in item;
}

export type HeaderLabels = {
  primaryNav: string;
  openMenu: string;
  closeMenu: string;
  language: string;
  requestDemo: string;
  contactSales: string;
};

type SiteHeaderProps = {
  locale: Locale;
  homeHref: string;
  demoHref: string;
  salesHref: string;
  nav: HeaderNav;
  labels: HeaderLabels;
};

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const HIDE_AFTER = 240;

export function SiteHeader({ locale, homeHref, demoHref, salesHref, nav, labels }: SiteHeaderProps) {
  const pathname = usePathname() ?? "";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lastY = useRef(0);

  // Scrolled state adds the shadow; scrolling down hides the header and any
  // upward scroll brings it straight back (spec §10).
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 8);
        const goingDown = y > lastY.current;
        setHidden(goingDown && y > HIDE_AFTER);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Keep the header visible while keyboard focus is inside it.
  const onFocusCapture = () => setHidden(false);

  const salesActive = isActivePath(pathname, salesHref);

  return (
    <header
      className={cx(styles.header, scrolled && styles.scrolled, hidden && !drawerOpen && styles.hidden)}
      onFocusCapture={onFocusCapture}
    >
      <div className={styles.row}>
        <Logo href={homeHref} priority />

        <nav className={styles.nav} aria-label={labels.primaryNav}>
          <ul role="list" className={styles.navList}>
            {nav.items.map((item) => {
              if (isHeaderGroup(item)) {
                const groupActive = item.items.some((link) => isActivePath(pathname, link.href));
                return (
                  <li key={item.label}>
                    <ResourcesMenu
                      label={item.label}
                      items={item.items}
                      pathname={pathname}
                      triggerClassName={cx(styles.navLink, groupActive && styles.active)}
                    />
                  </li>
                );
              }
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={cx(styles.navLink, active && styles.active)} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link
            href={salesHref}
            className={cx(styles.navLink, styles.salesLink, salesActive && styles.active)}
            aria-current={salesActive ? "page" : undefined}
          >
            {labels.contactSales}
          </Link>
          <LanguageSwitcher locale={locale} label={labels.language} />
          <Button href={demoHref} className={styles.cta} arrow>
            {labels.requestDemo}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-label={labels.openMenu}
          aria-expanded={drawerOpen}
          aria-controls="mobile-navigation"
          onClick={() => setDrawerOpen(true)}
        >
          <Menu size={24} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <MobileNav
        id="mobile-navigation"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          menuButtonRef.current?.focus();
        }}
        locale={locale}
        homeHref={homeHref}
        demoHref={demoHref}
        salesHref={salesHref}
        nav={nav}
        labels={labels}
        pathname={pathname}
      />
    </header>
  );
}
