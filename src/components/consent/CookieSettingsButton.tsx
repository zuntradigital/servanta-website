"use client";

import { openConsentPreferences } from "@/lib/consent";

export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => openConsentPreferences()}>
      {label}
    </button>
  );
}
