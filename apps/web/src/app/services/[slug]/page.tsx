import { getServiceBySlug } from "@panta/lib/src/sanity/queries";
import { Hero } from "@panta/ui/src/sections/Hero";
import { Feature } from "@panta/ui/src/sections/Features";
import { ServicePreviews } from "@panta/ui/src/sections/ServicePreviews";
import { ServiceDetails } from "@panta/ui/src/sections/ServiceDetails";
import { CTA } from "@panta/ui/src/sections/CTA";
import { Footer } from "@panta/ui/src/sections/Footer";
import { notFound } from "next/navigation";

const Section = ({ section }: { section: any }) => {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "feature":
    case "features":
      return <Feature section={section} />;
    case "servicePreviews":
      return <ServicePreviews section={section} />;
    case "serviceDetails":
      return <ServiceDetails section={section} />;
    case "cta":
      return <CTA section={section} />;
    default:
      return null;
  }
};

const renderContent = (content: any) => {
  if (!content) return null;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((block: any, i: number) => {
      if (!block) return null;
      if (block._type === "block" && Array.isArray(block.children)) {
        const text = block.children.map((c: any) => c.text || "").join("");
        return (
          <p key={block._key || i} className="my-4 text-lg leading-relaxed">
            {text}
          </p>
        );
      }
      return null;
    });
  }
  return String(content);
};

const getCategoryTitle = (category: any): string => {
  if (!category) return "Uncategorized";
  if (typeof category === "string") return category;
  return category.title || category.value || "Uncategorized";
};

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="px-6 py-24 sm:px-8 lg:px-12 min-h-[60vh] flex content-center flex-col justify-center items-center text-center">
        <div className="mb-4">
          <span className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
            {getCategoryTitle(service.category)}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight w-[80%] max-w-[900px]">
          {service.title}
        </h1>
        {service.description && (
          <p className="text-lg mt-4 w-[70%] max-w-[900px] text-neutral-300">
            {service.description}
          </p>
        )}
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          {service.content && (
            <div className="prose dark:prose-invert max-w-none">
              {renderContent(service.content)}
            </div>
          )}

          {/* Render CMS sections if available */}
          {service.sections?.length ? (
            <div className="mt-12">
              {service.sections.map((s: any, i: number) => (
                <Section key={i} section={s} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | Panta LLC`,
    description: service.description,
  };
}
