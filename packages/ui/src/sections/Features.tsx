import React from "react";

const items = [
  { title: "Fast", desc: "Optimized performance and loading." },
  { title: "Accessible", desc: "WCAG 2.1-compliant components." },
  { title: "Manageable", desc: "Sanity CMS-driven content." },
];

export function Feature({ section }: { section?: any }) {
  console.log("Section prop in Feature:", section);
  const renderContent = (content: any) => {
    if (!content) return null;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content.map((block: any, i: number) => {
        if (!block) return null;
        if (block._type === "block" && Array.isArray(block.children)) {
          const text = block.children.map((c: any) => c.text || "").join("");
          return (
            <p key={block._key || i} className="my-2">
              {text}
            </p>
          );
        }
        return (
          <pre key={block._key || i} className="my-2 whitespace-pre-wrap">
            {JSON.stringify(block)}
          </pre>
        );
      });
    }
    return String(content);
  };

  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {section?.heading && (
          <h2 className="text-3xl font-bold tracking-tight col-span-full text-center">
            {section.heading}
          </h2>
        )}
        {section?.content && (
          <div className="prose dark:prose-invert mt-4 col-span-full text-center">
            {renderContent(section.content)}
          </div>
        )}
      </div>
    </section>
  );
}
