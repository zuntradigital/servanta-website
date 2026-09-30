"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import type { HeaderLink } from "./SiteHeader";
import styles from "./ResourcesMenu.module.css";

type ResourcesMenuProps = {
  label: string;
  items: HeaderLink[];
  pathname: string;
  triggerClassName?: string;
};

/**
 * Simple single-column dropdown (spec §10): hover opens on desktop pointers,
 * tap/Enter/Space toggles, Escape and outside click close and return focus.
 */
export function ResourcesMenu({ label, items, pathname, triggerClassName }: ResourcesMenuProps) {
  // Remember which page the menu was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = useCallback(
    (value: boolean | ((current: boolean) => boolean)) =>
      setOpenOn((current) => {
        const next = typeof value === "function" ? value(current === pathname) : value;
        return next ? pathname : null;
      }),
    [pathname],
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const closeTimer = useRef<number | undefined>(undefined);
  // A mouse hover opens the menu just before the click lands; that first
  // click must not close it again (audit Partial #10).
  const openedByHover = useRef(false);
  const menuId = useId();

  const close = useCallback(
    (returnFocus = false) => {
      setOpen(false);
      if (returnFocus) triggerRef.current?.focus();
    },
    [setOpen],
  );

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  const focusItem = (index: number) => {
    const count = items.length;
    itemRefs.current[(index + count) % count]?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => focusItem(items.length - 1));
    } else if (event.key === "Escape") {
      close();
    }
  };

  const onMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = itemRefs.current.findIndex((el) => el === document.activeElement);
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusItem(index + 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        focusItem(index - 1);
        break;
      case "Home":
        event.preventDefault();
        focusItem(0);
        break;
      case "End":
        event.preventDefault();
        focusItem(items.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        close(true);
        break;
      case "Tab":
        close();
        break;
    }
  };

  const hoverCapable = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div
      ref={rootRef}
      className={styles.root}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse" || !hoverCapable()) return;
        window.clearTimeout(closeTimer.current);
        if (!open) openedByHover.current = true;
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse" || !hoverCapable()) return;
        closeTimer.current = window.setTimeout(() => {
          openedByHover.current = false;
          setOpen(false);
        }, 150);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={triggerClassName}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          // Read the ref, not `open`: a click landing in the same frame as the hover
          // still sees the stale closed state and would toggle the menu shut.
          if (openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          openedByHover.current = false;
          setOpen((value) => !value);
        }}
        onKeyDown={onTriggerKeyDown}
      >
        {label}
        <ChevronDown className={cx(styles.chevron, open && styles.chevronOpen)} size={16} strokeWidth={2} aria-hidden="true" />
      </button>

      <div id={menuId} role="menu" aria-label={label} className={cx(styles.menu, open && styles.open)} onKeyDown={onMenuKeyDown} hidden={!open}>
        {items.map((item, index) => {
          const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              role="menuitem"
              href={item.href}
              tabIndex={-1}
              className={cx(styles.item, current && styles.current)}
              aria-current={current ? "page" : undefined}
              onClick={() => close()}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
