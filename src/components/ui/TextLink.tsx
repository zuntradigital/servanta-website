import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./TextLink.module.css";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Tertiary CTA: accent-blue text link with a trailing arrow (spec §11). */
export function TextLink({ href, children, className }: TextLinkProps) {
  return (
    <Link href={href} className={cx(styles.link, className)} data-cta="">
      {children}
      <ArrowRight className={cx(styles.icon, "flip-rtl")} size={16} strokeWidth={2} aria-hidden="true" />
    </Link>
  );
}
