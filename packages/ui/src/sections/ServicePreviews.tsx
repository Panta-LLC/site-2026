import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ServiceCategory {
  _id: string;
  title: string;
  value: string;
  description?: string;
  previewImage?: {
    asset?: {
      _id?: string;
      url?: string;
    };
    alt?: string;
  };
  mainHeading?: string;
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
  const serviceCategories = section?.serviceCategories || [];
  const services = section?.services || [];

  const items =
    serviceCategories.length > 0
      ? serviceCategories.map((cat) => ({
          _id: cat._id,
          title: cat.title,
          description: cat.description || "",
          href: `/categories/${cat.value}`,
          previewImage: cat.previewImage,
          mainHeading: cat.mainHeading,
        }))
      : services.map((service) => ({
          _id: service._id,
          title: service.title,
          description: service.description,
          href: `/services/${service.slug.current}`,
          previewImage: undefined,
          mainHeading: undefined,
        }));

  const displayItems = items;

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {displayItems.map((item) => {
          const imageUrl = item.previewImage?.asset?.url;

          return (
            <Link
              key={item._id}
              href={item.href}
              className="group relative block bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="flex flex-col h-full">
                {imageUrl && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={item.previewImage?.alt || item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {item.mainHeading && (
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-2">
                      {item.mainHeading}
                    </h3>
                  )}

                  <h4 className="text-xl font-bold mb-4 group-hover:text-brand transition-colors">
                    {item.title}
                  </h4>

                  {item.description && (
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed flex-1">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
