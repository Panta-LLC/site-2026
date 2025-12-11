"use client";
import React from "react";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { AnalyticsProvider } from "@panta/lib";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider>
      <GrowthBookProvider>{children}</GrowthBookProvider>
    </AnalyticsProvider>
  );
}
