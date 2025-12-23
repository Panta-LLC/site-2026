"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useScheduleModal } from "./ScheduleModalContext";

type MenuItem = { title?: string; url?: string; internal?: { current?: string } };
type FooterCategory = { title?: string; links?: { label?: string; url?: string }[] };
type Notification = { enabled?: boolean; text?: string; url?: string; tone?: string };

export function Header({
  title,
  logo,
  menu = [],
  notificationBar,
}: {
  title?: string;
  logo?: { asset?: { url?: string }; alt?: string };
  menu?: MenuItem[];
  notificationBar?: Notification;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(!isHomepage);
  const scheduleModal = useScheduleModal();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white dark:bg-neutral-900 border-highlight border-b-4" : "bg-transparent"
      }`}
    >
      {notificationBar?.enabled && (
        <div
          className={`w-full text-sm px-4 py-2 text-center ${
            notificationBar.tone === "warning"
              ? "bg-yellow-50 text-yellow-900"
              : notificationBar.tone === "success"
              ? "bg-green-50 text-green-900"
              : "bg-neutral-50 text-neutral-800"
          }`}
        >
          {notificationBar.url ? (
            <a href={notificationBar.url} className="underline">
              {notificationBar.text}
            </a>
          ) : (
            <span>{notificationBar.text}</span>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {logo?.asset?.url ? (
            <Image
              src={
                logo.asset.url.startsWith("http")
                  ? logo.asset.url
                  : `https://cdn.sanity.io${logo.asset.url}`
              }
              alt={logo.alt || title || "Site logo"}
              width={150}
              height={50}
              className="rounded transition-all duration-300 object-contain"
              style={
                isScrolled
                  ? {
                      filter:
                        "brightness(0) saturate(100%) invert(8%) sepia(5%) saturate(4%) hue-rotate(314deg) brightness(95%) contrast(93%)",
                    }
                  : {}
              }
            />
          ) : (
            <div
              className={`w-9 h-9 rounded transition-colors duration-300 ${
                isScrolled ? "bg-black" : "bg-neutral-200 dark:bg-neutral-700"
              }`}
            />
          )}
        </Link>

        <button
          onClick={() => scheduleModal?.openModal("schedule")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
            isScrolled
              ? "bg-brand text-white hover:bg-brand-dark"
              : "bg-white text-brand hover:bg-neutral-100"
          }`}
        >
          Schedule a Call
        </button>
      </div>
    </header>
  );
}

export default Header;
