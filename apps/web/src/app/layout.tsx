import "./globals.css";
import type { Metadata } from "next";
import Providers from "../components/Providers";

export const metadata: Metadata = {
  title: "Panta Site",
  description: "High-performance site powered by Sanity CMS.",
  openGraph: {
    title: "Panta Site",
    description: "High-performance site powered by Sanity CMS.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="min-h-full">
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
