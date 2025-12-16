import React from "react";
import Link from "next/link";

interface CTAProps {
  section?: {
    heading?: string;
    content?: string | any;
    buttonText?: string;
    buttonLink?: string;
  };
  heading?: string;
  content?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function CTA({ section, heading, content, buttonText, buttonLink }: CTAProps) {
  const finalHeading = section?.heading || heading || "Ready to Get Started?";
  const finalContent = section?.content || content || "Let's discuss how we can help you achieve your goals.";
  const finalButtonText = section?.buttonText || buttonText || "Contact Us";
  const finalButtonLink = section?.buttonLink || buttonLink || "/contact";

  const renderContent = (content: any) => {
    if (!content) return null;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content.map((block: any, i: number) => {
        if (!block) return null;
        if (block._type === "block" && Array.isArray(block.children)) {
          const text = block.children.map((c: any) => c.text || "").join("");
          return (
            <p key={block._key || i} className="mt-3 text-neutral-700 dark:text-neutral-300">
              {text}
            </p>
          );
        }
        return null;
      });
    }
    return String(content);
  };

  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold">{finalHeading}</h2>
        {renderContent(finalContent)}
        <Link
          href={finalButtonLink}
          className="mt-6 inline-block rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold transition-colors"
        >
          {finalButtonText}
        </Link>
      </div>
    </section>
  );
}
