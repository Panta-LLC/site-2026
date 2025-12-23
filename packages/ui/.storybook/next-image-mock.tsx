import React from "react";

// Mock Next.js Image component for Storybook
export default function Image({
  src,
  alt,
  width,
  height,
  fill,
  className,
  sizes,
  ...props
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  [key: string]: any;
}) {
  if (fill) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        {...props}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
}
