"use client";
import React, { useEffect } from "react";
import mixpanel from "mixpanel-browser";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
    if (token) {
      mixpanel.init(token, { debug: process.env.NODE_ENV !== "production" });
      mixpanel.track("page_view");
    }
  }, []);
  return <>{children}</>;
}
