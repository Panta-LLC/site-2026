"use client";
import React, { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import { usePathname, useSearchParams } from "next/navigation";

export function initMixpanel(token?: string) {
  if (!token) return;
  try {
    mixpanel.init(token, { debug: process.env.NODE_ENV !== "production" });
  } catch (e) {
    // Fail silently in environments where window isn't available during SSR
  }
}

export function identify(userId?: string, traits?: Record<string, any>) {
  if (!userId) return;
  try {
    mixpanel.identify(userId);
    if (traits) mixpanel.people.set(traits);
  } catch (e) {
    // noop
  }
}

export function trackEvent(eventName: string, props?: Record<string, any>) {
  try {
    mixpanel.track(eventName, props);
  } catch (e) {
    // noop
  }
}

export function pageview(path?: string) {
  try {
    mixpanel.track("page_view", { path });
  } catch (e) {
    // noop
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    if (token) initMixpanel(token);
  }, []);

  useEffect(() => {
    const search = searchParams ? `?${searchParams.toString()}` : "";
    const path = `${pathname ?? "/"}${search}`;
    pageview(path);
  }, [pathname, searchParams]);

  return <>{children}</>;
}
