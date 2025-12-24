import React from "react";
import { PortableText } from "./PortableText";
import Link from "next/link";

interface ProcessStep {
  _key?: string;
  title?: string;
  description?: string;
}

interface ProcessSection {
  heading?: string;
  content?: string | any;
  steps?: ProcessStep[];
}

interface ProcessProps {
  section?: ProcessSection;
}

export function Process({ section }: ProcessProps) {

  const steps = section?.steps || [];

  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        {section?.heading && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">
            {section.heading}
          </h2>
        )}
        {section?.content && (
          <div className="prose dark:prose-invert max-w-3xl mx-auto text-center mb-12 text-neutral-700 dark:text-neutral-300">
            <PortableText content={section.content} />
          </div>
        )}
        {steps.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i: number) => (
              <div key={step._key || i} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold text-xl mb-4 relative z-10">
                    {i + 1}
                  </div>
                  {step.title && <h3 className="text-xl font-bold mb-3">{step.title}</h3>}
                  {step.description && (
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 h-0.5 bg-neutral-200 dark:bg-neutral-700 z-0"
                    style={{
                      left: "calc(50% + 1.5rem)",
                      width: "calc(100% - 1.5rem + 2rem)",
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
