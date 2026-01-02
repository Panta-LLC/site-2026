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
    <section className="px-6 py-20 sm:px-8 lg:px-12 bg-neutral-50 dark:bg-neutral-800">
      <div className="max-w-6xl mx-auto">
        {section?.heading && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-6">
            {section.heading}
          </h2>
        )}
        {section?.content && (
          <div className="prose dark:prose-invert max-w-3xl mx-auto text-center mb-16 text-neutral-700 dark:text-neutral-300">
            <PortableText content={section.content} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {goodFit.length > 0 && (
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-xl border-2 border-brand/20 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand">We work best with:</h3>
              </div>
              <ul className="space-y-3">
                {goodFit.map((item, i) => (
                  <li key={i} className="flex items-start group">
                    <span className="text-brand mr-3 mt-0.5 font-bold text-lg">✓</span>
                    <span className="text-neutral-700 dark:text-neutral-300 leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {notGoodFit.length > 0 && (
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-neutral-600 dark:text-neutral-400">
                  This may not be a fit if:
                </h3>
              </div>
              <ul className="space-y-3">
                {notGoodFit.map((item, i) => (
                  <li key={i} className="flex items-start group">
                    <span className="text-neutral-400 mr-3 mt-0.5 font-bold text-lg">×</span>
                    <span className="text-neutral-600 dark:text-neutral-400 leading-relaxed group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                      {item}
                    </span>
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
