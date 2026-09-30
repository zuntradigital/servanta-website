import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "inverse";

type CommonProps = {
  variant?: Variant;
  size?: "md" | "lg";
  fullWidth?: boolean;
  /** Full width below 480px (spec §11), primary/inverse only. */
  mobileFullWidth?: boolean;
  className?: string;
  /** Trailing arrow, used on forward-moving CTAs (mirrors in RTL). */
  arrow?: boolean;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className">;
type ButtonAsButton = CommonProps & { href?: undefined; loading?: boolean; loadingLabel?: string } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function classes({ variant = "primary", size = "md", fullWidth, mobileFullWidth, className }: CommonProps) {
  return cx(
    styles.button,
    styles[variant],
    size === "lg" && styles.lg,
    fullWidth && styles.full,
    mobileFullWidth && styles.mobileFull,
    className,
  );
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, fullWidth, mobileFullWidth, className, children, href, arrow, ...rest } = props;
    return (
      <Link href={href} className={classes({ variant, size, fullWidth, mobileFullWidth, className, children })} data-cta="" {...rest}>
        <span className={styles.label}>
          {children}
          {arrow && <ArrowRight size={16} strokeWidth={2} className={styles.arrow} aria-hidden="true" />}
        </span>
      </Link>
    );
  }

  const {
    variant,
    size,
    fullWidth,
    mobileFullWidth,
    className,
    children,
    arrow,
    loading = false,
    loadingLabel,
    disabled,
    type = "button",
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={cx(classes({ variant, size, fullWidth, mobileFullWidth, className, children }), loading && styles.loading)}
      disabled={disabled}
      aria-disabled={loading || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      <span className={styles.label}>
        {children}
        {arrow && <ArrowRight size={16} strokeWidth={2} className={styles.arrow} aria-hidden="true" />}
      </span>
      {loading && (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          {loadingLabel && <span className="visually-hidden">{loadingLabel}</span>}
        </>
      )}
    </button>
  );
}
