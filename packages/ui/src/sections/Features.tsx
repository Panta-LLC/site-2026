"use client";

import React from "react";
import { PortableText } from "./PortableText";
import { useScheduleModal } from "./ScheduleModalContext";
import { ContactModalMode } from "./ContactModal";

interface Benefit {
  _key?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaModalMode?: ContactModalMode;
}

interface FeatureSection {
  heading?: string;
  content?: string | any;
  benefits?: Benefit[];
}

interface FeatureProps {
  section?: FeatureSection;
}

const items = [
  { title: "Fast", desc: "Optimized performance and loading." },
  { title: "Accessible", desc: "WCAG 2.1-compliant components." },
  { title: "Manageable", desc: "Sanity CMS-driven content." },
];

// Map service titles to modal modes
function getModalModeFromTitle(title?: string): ContactModalMode | null {
  if (!title) return null;
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("consulting") || lowerTitle.includes("strategic")) {
    return "consulting";
  }
  if (lowerTitle.includes("product") || lowerTitle.includes("development") || lowerTitle.includes("app")) {
    return "product";
  }
  if (lowerTitle.includes("media") || lowerTitle.includes("digital") || lowerTitle.includes("presence")) {
    return "media";
  }
  return null;
}

export function Feature({ section }: FeatureProps) {
  const scheduleModal = useScheduleModal();
  const benefits = section?.benefits || [];

  const handleCTAClick = (benefit: Benefit, e: React.MouseEvent) => {
    e.preventDefault();
    if (!scheduleModal) return;
    
    const modalMode = benefit.ctaModalMode || getModalModeFromTitle(benefit.title) || "message";
    scheduleModal.openModal(modalMode);
  };

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
            <PortableText content={section.content} />
          </div>
        )}
        {benefits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i: number) => {
              const hasCTA = scheduleModal && (benefit.ctaText || getModalModeFromTitle(benefit.title));
              const ctaText = benefit.ctaText || "Learn More";
              
              return (
                <div 
                  key={benefit._key || i} 
                  className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-brand dark:hover:border-brand transition-colors flex flex-col"
                >
                  {benefit.title && (
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  )}
                  {benefit.description && (
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4 flex-1">
                      {benefit.description}
                    </p>
                  )}
                  {hasCTA && (
                    <button
                      onClick={(e) => handleCTAClick(benefit, e)}
                      className="mt-auto px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors font-semibold text-sm w-full"
                    >
                      {ctaText}
                    </button>
                  )}
                </div>
              );
            })}
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
