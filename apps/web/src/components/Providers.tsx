"use client";
import React, { Suspense } from "react";
import { GrowthBookProvider } from "@growthbook/growthbook-react";
import { AnalyticsProvider } from "@panta/lib";
import { ScheduleModalProvider } from "@panta/ui/src/sections/ScheduleModalContext";

export default function Providers({ 
  children,
  email,
  phone,
}: { 
  children: React.ReactNode;
  email?: string;
  phone?: string;
}) {
  return (
    <Suspense fallback={null}>
      <AnalyticsProvider>
        <GrowthBookProvider>
          <ScheduleModalProvider email={email} phone={phone}>
            {children}
          </ScheduleModalProvider>
        </GrowthBookProvider>
      </AnalyticsProvider>
    </Suspense>
  );
}
