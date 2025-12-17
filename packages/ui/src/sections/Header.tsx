"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    // Check initial scroll position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest("header")) {
        setIsMobileMenuOpen(false);
      }
    };

    // Close on escape key
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {logo?.asset?.url ? (
            <img
              src={logo.asset.url}
              alt={logo.alt || title || "Site logo"}
              width={150}
              className="rounded transition-all duration-300"
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

        {/* Desktop Navigation */}
        <nav
          className={`hidden md:flex gap-7 transition-all duration-300 ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          {menu &&
            menu.map((m, i) => {
              const href = m.url || m.internal?.current || "#";
              return (
                <a key={i} href={href} className="text-lg font-bold hover:underline">
                  {m.title}
                </a>
              );
            })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className={`md:hidden p-2 transition-colors ${isScrolled ? "text-black" : "text-white"}`}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            // Close icon (X)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div
            className={`absolute top-full left-0 right-0 md:hidden transition-all duration-300 ${
              isScrolled ? "bg-white dark:bg-neutral-900 shadow-lg" : "bg-gray-900"
            }`}
          >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4">
              {menu &&
                menu.map((m, i) => {
                  const href = m.url || m.internal?.current || "#";
                  return (
                    <a
                      key={i}
                      href={href}
                      onClick={closeMobileMenu}
                      className={`text-sm hover:underline py-2 ${
                        isScrolled ? "text-black" : "text-white"
                      }`}
                    >
                      {m.title}
                    </a>
                  );
                })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
