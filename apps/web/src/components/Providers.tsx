"use client";
import React from "react";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { AnalyticsProvider } from "../../../../packages/lib/src/analytics/AnalyticsProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider>
      <GrowthBookProvider>{children}</GrowthBookProvider>
    </AnalyticsProvider>
  );
}
