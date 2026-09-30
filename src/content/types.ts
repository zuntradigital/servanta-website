import type { LucideIcon } from "lucide-react";

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  id?: string;
  /** Capability status shown on the card (WEB-MKT-SRS-002 §56). */
  badge?: { label: string; tone: "success" | "warning" };
};

export type StepItem = { title: string; description: string; link?: { label: string; href: string } };

export type StatItem = { value: string; label: string };

export type FaqItem = { question: string; answer: string };

export type LogoItem = { name: string; src: string; href?: string };

export type CtaContent = {
  heading: string;
  body?: string;
};
