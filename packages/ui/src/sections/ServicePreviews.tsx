import React from "react";
import Link from "next/link";

interface ServiceCategory {
  _id: string;
  title: string;
  value: string;
  description?: string;
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
    serviceCategories?: ServiceCategory[];
  };
}

export function ServicePreviews({ section }: ServicePreviewsProps) {
  // Support both serviceCategories (new) and services (legacy)
  const serviceCategories = section?.serviceCategories || [];
  const services = section?.services || [];
  const heading = section?.heading;

  // If serviceCategories are provided, use those; otherwise fall back to services
  const items =
    serviceCategories.length > 0
      ? serviceCategories.map((cat) => ({
          _id: cat._id,
          title: cat.title,
          description: cat.description || "",
          href: `/categories/${cat.value}`,
        }))
      : services.map((service) => ({
          _id: service._id,
          title: service.title,
          description: service.description,
          href: `/services/${service.slug.current}`,
        }));

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        {heading && (
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">{heading}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <Link
              key={item._id}
              href={item.href}
              className="group block p-6 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-lg transition-all duration-200"
            >
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              )}
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
