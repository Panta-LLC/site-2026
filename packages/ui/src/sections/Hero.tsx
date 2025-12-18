import React from "react";

interface HeroSection {
  heading?: string;
  content?: string | any;
}

interface HeroProps {
  section?: HeroSection;
}

export function Hero({ section }: HeroProps) {
  const renderContent = (content: any) => {
    if (!content) return null;
    if (typeof content === "string") return content;
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
        return (
          <pre key={block._key || i} className="my-4 whitespace-pre-wrap">
            {JSON.stringify(block)}
          </pre>
        );
      });
    }
    return String(content);
  };

  const heading = section?.heading ?? "Welcome to Panta";

  const content = section?.content ?? [
    {
      _key: "default",
      _type: "block",
      children: [{ text: "Build delightful websites powered by Sanity and Next.js." }],
      style: "normal",
    },
  ];

  return (
    <section className="py-24 text-white bg-gray-900 pt-32">
      <div className="max-w-6xl sm:px-8 lg:px-12 mx-auto flex  flex-col justify-center items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight w-[80%] max-w-[900px]">
          {heading}
        </h1>
        <div className="text-lg prose dark:prose-invert mt-4 w-[70%] max-w-[900px]">
          {renderContent(content)}
        </div>
      </div>
    </section>
  );
}
