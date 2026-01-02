import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 py-8 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          © {new Date().getFullYear()} Panta. All rights reserved.
        </p>
        <nav className="flex gap-4 text-sm">
          <Link href="/privacy" className="hover:underline text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:underline text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            Terms
          </Link>
          <Link href="/contact" className="hover:underline text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
