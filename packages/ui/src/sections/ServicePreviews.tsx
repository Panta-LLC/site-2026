import React from "react";
import Link from "next/link";

interface ServiceCategory {
  _id: string;
  title: string;
  value: string;
}

interface Service {
  _id: string;
  title: string;
  category?: ServiceCategory | string | null;
  description: string;
  slug: {
    current: string;
  };
}

interface ServicePreviewsProps {
  section?: {
    heading?: string;
    services?: Service[];
  };
}

const getCategoryTitle = (category: ServiceCategory | string | null | undefined): string => {
  if (!category) return "Uncategorized";
  if (typeof category === "string") return category;
  return category.title || category.value || "Uncategorized";
};

export function ServicePreviews({ section }: ServicePreviewsProps) {
  const services = section?.services || [];
  const heading = section?.heading || "Our Services";

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Link
              key={service._id}
              href={`/services/${service.slug.current}`}
              className="group block p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-lg transition-all duration-200"
            >
              <div className="mb-2">
                <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                  {getCategoryTitle(service.category)}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                Learn more →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

