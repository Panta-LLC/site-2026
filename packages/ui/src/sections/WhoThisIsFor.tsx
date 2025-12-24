import React from "react";
import { PortableText } from "./PortableText";

interface WhoThisIsForSection {
  heading?: string;
  content?: string | any;
  goodFit?: string[];
  notGoodFit?: string[];
}

interface WhoThisIsForProps {
  section?: WhoThisIsForSection;
}

export function WhoThisIsFor({ section }: WhoThisIsForProps) {
  const goodFit = section?.goodFit || [];
  const notGoodFit = section?.notGoodFit || [];

  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-4xl mx-auto justify-center items-center">
        {section?.heading && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
            {section.heading}
          </h2>
        )}
        {section?.content && (
          <div className="prose dark:prose-invert max-w-3xl mx-auto text-center mb-12 text-neutral-700 dark:text-neutral-300">
            <PortableText content={section.content} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goodFit.length > 0 && (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-bold mb-4 text-brand">We work best with:</h3>
              <ul className="space-y-2">
                {goodFit.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-brand mr-2 mt-1">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {notGoodFit.length > 0 && (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <h3 className="text-xl font-bold mb-4 text-neutral-600 dark:text-neutral-400">
                This may not be a fit if:
              </h3>
              <ul className="space-y-2">
                {notGoodFit.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-neutral-400 mr-2 mt-1">×</span>
                    <span className="text-neutral-600 dark:text-neutral-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
