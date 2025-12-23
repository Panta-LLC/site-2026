import React from "react";

// Mock Next.js Link component for Storybook
export default function Link({
  children,
  href,
  className,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}
