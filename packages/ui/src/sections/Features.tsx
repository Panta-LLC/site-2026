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

  // Check if section has benefits array (for category pages)
  const benefits = section?.benefits || [];

  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        {section?.heading && (
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            {section.heading}
          </h2>
        )}
        {section?.content && (
          <div className="prose dark:prose-invert mt-4 text-center mb-12">
            {renderContent(section.content)}
          </div>
        )}
        {benefits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit: any, i: number) => (
              <div key={benefit._key || i} className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                {benefit.title && (
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                )}
                {benefit.description && (
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {benefit.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <div key={i} className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
