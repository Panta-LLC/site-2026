import React from "react";

export function Hero({ section }: { section?: any }) {
  console.log(Boolean(section) ? "Rendering Hero with section prop" : "Rendering default Hero");
  if (!section) return;
  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12 text-white bg-gray-900 h-screen">
      <div className="max-w-6xl mx-auto">
        {section.heading && (
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{section.heading}</h1>
        )}
        {section.content && (
          <div className="prose dark:prose-invert mt-4">
            {/* Assuming section.content is Portable Text or similar */}
            {section.content}
          </div>
        )}
      </div>
    </section>
  );
}
