import Image from "next/image";
import Link from "next/link";
import logoImage from "@/assets/servanta-logo.gif";
import { brand } from "@/config/brand";
import { cx } from "@/lib/cx";
import styles from "./Logo.module.css";

type LogoProps = { href?: string; onDark?: boolean; priority?: boolean; className?: string };

/**
 * Official SERVANTA logo: the supplied transparent GIF, served byte-for-byte
 * (unoptimized, so it is never re-encoded), never recoloured. `onDark` only
 * sets the footer size; moka asked for no plate behind it there.
 */
export function Logo({ href, onDark, priority, className }: LogoProps) {
  const classes = cx(styles.logo, onDark && styles.onDark, className);
  const image = (
    <Image
      src={logoImage}
      alt={href ? `${brand.name} home` : brand.name}
      className={styles.image}
      unoptimized
      priority={priority}
      draggable={false}
    />
  );

  if (!href) return <span className={classes}>{image}</span>;
  return (
    <Link href={href} className={classes}>
      {image}
    </Link>
  );
}
