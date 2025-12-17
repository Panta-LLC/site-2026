"use client";

import React, { useState } from "react";

interface ProblemSolution {
  problem: string;
  solution: string;
}

const problemsSolutions: ProblemSolution[] = [
  {
    problem: "Maximizing the value of your technology investments",
    solution:
      "We provide strategic guidance to ensure your technology investments deliver maximum ROI and align with your business objectives.",
  },
  {
    problem: "Understanding the capabilities of your technology",
    solution:
      "Our experts assess your current technology stack and help you understand what's possible, what's needed, and how to leverage existing tools effectively.",
  },
  {
    problem: "Reaching your target audience effectively",
    solution:
      "We develop comprehensive digital strategies and create engaging user experiences that connect with your audience and drive engagement.",
  },
  {
    problem: "Measuring the success of your technology investments",
    solution:
      "We establish clear metrics and analytics frameworks so you can track performance, measure ROI, and make data-driven decisions.",
  },
  {
    problem: "Improving your website user experience",
    solution:
      "We design and develop websites that are intuitive, fast, and conversion-focused, ensuring visitors have a seamless experience that drives results.",
  },
  {
    problem: "Improving your mobile app user experience",
    solution:
      "We create mobile applications with user-centered design, ensuring your app is both functional and delightful for your users.",
  },
  {
    problem: "Improving your email marketing user experience",
    solution:
      "We craft email campaigns that are engaging, responsive, and designed to convert, while ensuring they deliver value to your subscribers.",
  },
  {
    problem: "Producing digital and print marketing materials",
    solution:
      "We create compelling visual communications that strengthen your brand, from digital graphics to print collateral that makes an impact.",
  },
  {
    problem: "Improving your business visibility",
    solution:
      "We enhance your digital presence through strategic design, development, and marketing approaches that help you stand out in your market.",
  },
];

export function ProblemsWeSolve() {
  // First 3 cards (first row) expanded by default, rest collapsed
  const [expandedCards, setExpandedCards] = useState<Set<number>>(
    new Set([0, 1, 2])
  );

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Problems We Solve
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
            Every business faces unique challenges. We help you overcome them with strategic
            solutions tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemsSolutions.map((item, index) => {
            const isExpanded = expandedCards.has(index);
            return (
              <div
                key={index}
                className="rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
              >
                <button
                  onClick={() => toggleCard(index)}
                  className="w-full p-6 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset rounded-lg"
                  aria-expanded={isExpanded}
                  aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.problem}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {item.problem}
                      </h3>
                      <div className="w-12 h-0.5 bg-brand"></div>
                    </div>
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className={`w-5 h-5 text-neutral-600 dark:text-neutral-400 transition-transform duration-300 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

