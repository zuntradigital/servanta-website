"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { FaqItem } from "@/content/types";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/cx";
import styles from "./FaqAccordion.module.css";

type FaqAccordionProps = {
  items: FaqItem[];
  headingLevel?: "h3" | "h4";
  /** Index of an item open on first render. */
  defaultOpen?: number;
};

/** FAQ accordion (spec §9): keyboard-operable buttons with aria-expanded. */
export function FaqAccordion({ items, headingLevel: Heading = "h3", defaultOpen }: FaqAccordionProps) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen === undefined ? [] : [defaultOpen]));
  const baseId = useId();

  const toggle = (index: number) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={item.question} className={styles.item} data-reveal="fade" style={{ ["--reveal-index" as string]: index % 4 }}>
            <Heading className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  if (!isOpen) track("faq_expand", { content_id: item.question });
                  toggle(index);
                }}
              >
                <span>{item.question}</span>
                <Plus className={styles.icon} size={18} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} className={cx(styles.panel, isOpen && styles.open)} inert={!isOpen}>
              <div className={styles.panelInner}>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
