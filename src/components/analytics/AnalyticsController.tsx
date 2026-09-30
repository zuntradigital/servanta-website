"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { campaignParams, captureCampaignParams, clearAnalyticsIds, track } from "@/lib/analytics";
import { getConsent, subscribeConsent } from "@/lib/consent";

/**
 * Emits page_view on every route change and the click events of
 * WEB-MKT-SRS-002 §84 from one delegated listener: cta_click for any
 * `[data-cta]` (Button, TextLink), plus hero_cta_click, blog_cta_click,
 * pricing_plan_cta, navigation_click and language_switch by context.
 * Events are dropped unless the visitor accepted analytics (see
 * lib/analytics.ts); no provider is loaded here.
 */
export function AnalyticsController({ locale }: { locale: string }) {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  const granted = consent?.analytics === true;
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    captureCampaignParams();
  }, []);

  // Withdrawn consent removes the analytics identifiers (§85).
  useEffect(() => {
    if (consent && !consent.analytics) clearAnalyticsIds();
  }, [consent]);

  useEffect(() => {
    if (!granted || lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    // Wait a frame so document.title reflects the new page.
    const frame = requestAnimationFrame(() => {
      track("page_view", {
        page_path: pathname,
        page_title: document.title,
        locale,
        ...campaignParams(),
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, granted, locale]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const origin = event.target as Element | null;
      const link = origin?.closest<HTMLAnchorElement>("a[href]");

      if (link?.hasAttribute("hreflang") && link.closest("header, #mobile-navigation")) {
        track("language_switch", { cta_id: link.getAttribute("hreflang") ?? undefined, page_path: window.location.pathname });
        return;
      }
      if (link && !link.hasAttribute("data-cta") && link.closest("header nav, footer nav, #mobile-navigation nav")) {
        track("navigation_click", { cta_id: link.getAttribute("href") ?? undefined, cta_label: link.textContent?.trim() || undefined });
        return;
      }

      const target = origin?.closest<HTMLElement>("[data-cta]");
      if (!target) return;
      const section = target.closest<HTMLElement>("section, header, footer, form, article");
      const params = {
        cta_id: target.dataset.cta || target.getAttribute("href") || undefined,
        cta_label: target.textContent?.trim() || undefined,
        page_path: window.location.pathname,
        section_context: section?.getAttribute("aria-labelledby") || section?.id || section?.tagName.toLowerCase(),
      };
      track("cta_click", params);
      if (target.closest("[aria-labelledby=\"hero-title\"]")) track("hero_cta_click", params);
      if (/\/blog\/[^/]+$/.test(window.location.pathname) && !target.closest("header, footer")) track("blog_cta_click", params);
      if (target.dataset.planCta) track("pricing_plan_cta", { ...params, content_id: target.dataset.planCta });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
