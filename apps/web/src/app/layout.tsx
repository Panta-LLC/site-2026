import "./globals.css";
import type { Metadata } from "next";
import Providers from "../components/Providers";
import Header from "../../../../packages/ui/src/sections/Header";
import { fetchSiteConfig } from "../../../../packages/lib/src/sanity/siteConfig";

export const metadata: Metadata = {
  title: "Panta Site",
  description: "High-performance site powered by Sanity CMS.",
  openGraph: {
    title: "Panta Site",
    description: "High-performance site powered by Sanity CMS.",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await fetchSiteConfig().catch(() => null);

  return (
    <html lang="en" className="min-h-full">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/jpq4nju.css" />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        <Providers>
          {/* Header uses site-wide content from Sanity */}
          <Header
            title={site?.title}
            logo={site?.logo}
            menu={site?.menu}
            notificationBar={site?.notificationBar}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
