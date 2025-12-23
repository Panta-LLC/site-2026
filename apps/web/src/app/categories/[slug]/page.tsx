import { getCategoryByValue, getServicesByCategory } from "@panta/lib/src/sanity/queries";
import { Hero } from "@panta/ui/src/sections/Hero";
import { Feature } from "@panta/ui/src/sections/Features";
import { ServiceDetails } from "@panta/ui/src/sections/ServiceDetails";
import { CTA } from "@panta/ui/src/sections/CTA";
import { Footer } from "@panta/ui/src/sections/Footer";
import { notFound } from "next/navigation";

const renderContent = (content: any) => {
  if (!content) return null;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map((block: any, i: number) => {
      if (!block) return null;
      if (block._type === "block" && Array.isArray(block.children)) {
        const text = block.children.map((c: any) => c.text || "").join("");
        return (
          <p
            key={block._key || i}
            className="my-4 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300"
          >
            {text}
          </p>
        );
      }
      return null;
    });
  }
  return String(content);
};

const Section = ({ section }: { section: any }) => {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "feature":
    case "features":
      return <Feature section={section} />;
    // case "servicePreviews":
    //   return <ServicePreviews section={section} />;
    case "serviceDetails":
      return <ServiceDetails section={section} />;
    case "cta":
      return <CTA section={section} />;
    default:
      return null;
  }
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryByValue(params.slug);

  if (!category) {
    notFound();
  }

  // Get all services in this category
  const services = await getServicesByCategory(category.value);

  const heroHeading = category.heroHeading || category.title;
  const heroDescription = category.heroDescription || category.description;

  return (
    <main>
      {/* Hero Section */}
      <section className="px-6 py-24 sm:px-8 lg:px-12 text-white bg-gray-900 min-h-[60vh] flex content-center flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight w-[80%] max-w-[900px]">
          {heroHeading}
        </h1>
        {heroDescription && (
          <p className="text-lg mt-4 w-[70%] max-w-[900px] text-neutral-300">{heroDescription}</p>
        )}
      </section>

      {/* Overview Section */}
      {category.overview && category.overview.length > 0 && (
        <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
          <div className="max-w-4xl mx-auto">
            <div className="prose dark:prose-invert max-w-none">
              {renderContent(category.overview)}
            </div>
          </div>
        </section>
      )}

      {/* Services Details Section */}
      {services.length > 0 && (
        <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16">
              {services.map((service: any) => (
                <div
                  key={service._id}
                  className="border-b border-neutral-200 dark:border-neutral-700 pb-16 last:border-b-0 last:pb-0"
                >
                  {/* Service Title */}
                  {/* <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
                    {service.title}
                  </h3> */}
                  <div>
                    {/* Service Sections */}
                    {service.sections && service.sections.length > 0 && (
                      <div className="space-y-6">
                        {service.sections.map((section: any, i: number) => (
                          <div key={i}>
                            <Section section={section} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {category.benefits && category.benefits.length > 0 && (
        <Feature
          section={{
            type: "features",
            heading: `Why Choose ${category.title}?`,
            benefits: category.benefits,
          }}
        />
      )}

      {/* Process/Methodology Section */}
      {category.process && category.process.length > 0 && (
        <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Our Approach</h2>
            <div className="prose dark:prose-invert max-w-none">
              {renderContent(category.process)}
            </div>
          </div>
        </section>
      )}

      {/* Additional CMS Sections */}
      {category.sections?.length ? (
        <div>
          {category.sections.map((s: any, i: number) => (
            <Section key={i} section={s} />
          ))}
        </div>
      ) : null}

      {/* CTA Section */}
      {(category.ctaHeading || category.ctaContent) && (
        <CTA
          heading={category.ctaHeading}
          content={category.ctaContent}
          buttonText={category.ctaButtonText}
        />
      )}

      <Footer />
    </main>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = await getCategoryByValue(params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const title = category.seo?.description
    ? `${category.title} | Panta LLC`
    : `${category.title} | Panta LLC`;

  return {
    title,
    description:
      category.seo?.description ||
      category.description ||
      `${category.title} services from Panta LLC`,
    keywords: category.seo?.keywords || [],
  };
}
