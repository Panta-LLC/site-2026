"use client";

import React from "react";
import { PortableText as SanityPortableText, PortableTextComponents } from "@portabletext/react";
import Link from "next/link";

interface PortableTextProps {
  content: any;
  className?: string;
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-4 mt-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-3 mt-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mb-2 mt-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2 mt-3">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-600 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-4">{children}</li>,
    number: ({ children }) => <li className="ml-4">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || "";
      const isInternal = href.startsWith("/");
      
      if (isInternal) {
        return (
          <Link href={href} className="text-brand hover:underline">
            {children}
          </Link>
        );
      }
      
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableText({ content, className = "" }: PortableTextProps) {
  if (!content) return null;
  
  // Handle string content
  if (typeof content === "string") {
    return <p className={className}>{content}</p>;
  }
  
  // Handle array content (portable text)
  if (Array.isArray(content)) {
    return (
      <div className={className}>
        <SanityPortableText value={content} components={components} />
      </div>
    );
  }
  
  // Fallback for other types
  return <div className={className}>{String(content)}</div>;
}

