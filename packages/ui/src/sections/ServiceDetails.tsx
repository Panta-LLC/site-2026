import React from "react";
import { PortableText } from "./PortableText";

interface ServiceDetailsProps {
  section?: {
    heading?: string;
    content?: any;
    serviceList?: string[];
  };
}


export function ServiceDetails({ section }: ServiceDetailsProps) {
  const content = section?.content;
  const serviceList = section?.serviceList || [];
  const heading = section?.heading;

  if (!content && serviceList.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {content && (
          <div className="md:col-span-2">
            {heading && <h2 className="text-2xl font-bold mb-4">{heading}</h2>}
            <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
              <PortableText content={content} />
            </div>
          </div>
        )}

        {serviceList.length > 0 && (
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Service Details</h2>
            <ul className="space-y-3">
              {serviceList.map((service, index) => (
                <li key={index} className="text-neutral-700 dark:text-neutral-300 flex items-start">
                  <span className="text-brand mr-2 mt-1">•</span>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
