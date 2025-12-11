import React from "react";

export function Hero({ section }: { section?: any }) {
  const renderContent = (content: any) => {
    if (!content) return null;
    // If it's a string, just return it
    if (typeof content === "string") return content;
    // If it's an array of blocks (Sanity Portable Text), map to paragraphs
    if (Array.isArray(content)) {
      return content.map((block: any, i: number) => {
        if (!block) return null;
        if (block._type === "block" && Array.isArray(block.children)) {
          const text = block.children.map((c: any) => c.text || "").join("");
          return (
            <p key={block._key || i} className="my-4">
              {text}
            </p>
          );
        }
        // Fallback: stringify
        return (
          <pre key={block._key || i} className="my-4 whitespace-pre-wrap">
            {JSON.stringify(block)}
          </pre>
        );
      });
    }
    // Unknown object, stringify safely
    return String(content);
  };

  const heading = section?.heading ?? "Welcome to Panta";
  console.log("Hero section content:", section);
  const content = section?.content ?? [
    {
      _key: "default",
      _type: "block",
      children: [{ text: "Build delightful websites powered by Sanity and Next.js." }],
      style: "normal",
    },
  ];

  return (
    <section className="px-6 py-24 sm:px-8 lg:px-12 text-white bg-gray-900 min-h-screen flex content-center flex-col justify-center items-center text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight w-[80%] max-w-[900px]">
        {heading}
      </h1>
      <h2 className="text-3xl prose dark:prose-invert mt-4 w-[70%] max-w-[900px]">
        {renderContent(content)}
      </h2>
    </section>
  );
}
