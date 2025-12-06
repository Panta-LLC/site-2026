import React from "react";

export function Footer() {
  return (
    <footer className="px-6 py-12 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          © {new Date().getFullYear()} Panta. All rights reserved.
        </p>
        <nav className="flex gap-4 text-sm">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
