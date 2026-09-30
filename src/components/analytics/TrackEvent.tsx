"use client";

import { useEffect, useSyncExternalStore } from "react";
import { track, type AnalyticsEvent, type AnalyticsParams } from "@/lib/analytics";
import { getConsent, subscribeConsent } from "@/lib/consent";

/** Emits one analytics event for the page it is rendered on (e.g. blog_article_view). */
export function TrackEvent({ event, params }: { event: AnalyticsEvent; params: AnalyticsParams }) {
  const granted = useSyncExternalStore(subscribeConsent, () => getConsent()?.analytics === true, () => false);
  const key = JSON.stringify(params);

  useEffect(() => {
    if (granted) track(event, JSON.parse(key) as AnalyticsParams);
  }, [granted, event, key]);

  return null;
}
