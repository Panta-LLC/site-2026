import React from "react";

const items = [
  { title: "Fast", desc: "Optimized performance and loading." },
  { title: "Accessible", desc: "WCAG 2.1-compliant components." },
  { title: "Manageable", desc: "Sanity CMS-driven content." },
];

export function Features() {
  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((i) => (
          <div
            key={i.title}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-6"
          >
            <h3 className="text-xl font-semibold">{i.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
