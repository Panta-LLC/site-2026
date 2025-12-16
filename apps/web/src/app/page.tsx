import { Hero } from "@panta/ui/src/sections/Hero";
import { ServicePreviews } from "@panta/ui/src/sections/ServicePreviews";
import { Footer } from "@panta/ui/src/sections/Footer";
import { sanityClient } from "@panta/lib/src/sanity/client";
import Link from "next/link";

async function getAllServices() {
  const query = `*[_type == "service"] | order(title asc) {
    _id,
    title,
    category->{
      _id,
      title,
      value
    },
    description,
    slug
  }`;
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (e) {
    return [];
  }
}

async function getHomepage() {
  const query = `*[_type == "page" && slug.current == "home"][0]{
    title,
    sections[]{type, heading, content}
  }`;
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (e) {
    return null;
  }
}

const renderContent = (content: any) => {
  if (!content) return null;
  // If it's a string, just return it
  if (typeof content === "string") return content;
  // If it's an array of blocks (Sanity Portable Text), map to text
  if (Array.isArray(content)) {
    return content
      .map((block: any, i: number) => {
        if (!block) return null;
        if (block._type === "block" && Array.isArray(block.children)) {
          return block.children.map((c: any) => c.text || "").join("");
        }
        return null;
      })
      .filter(Boolean)
      .join(" ");
  }
  // Unknown object, stringify safely
  return String(content);
};

export default async function HomePage() {
  const services = await getAllServices();
  const homepage = await getHomepage();

  const heroContent = homepage?.sections?.find((s: any) => s.type === "hero")?.content;
  const heroHeading = homepage?.sections?.find((s: any) => s.type === "hero")?.heading;
  console.log("Services", services);

  return (
    <main>
      {/* Hero Section */}
      <section className="px-6 py-24 sm:px-8 lg:px-12 text-white bg-gray-900 min-h-screen flex content-center flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight w-[80%] max-w-[900px]">
          {heroHeading || "Transform Your Business with Expert Technology Solutions"}
        </h1>
        {heroContent && (
          <p className="text-lg md:text-xl mt-6 w-[70%] max-w-[900px] text-neutral-300">
            {renderContent(heroContent)}
          </p>
        )}
        {services.length > 0 && (
          <div className="mt-8 flex gap-4 flex-wrap justify-center">
            {services.map((service, index) => {
              const href = `/services/${service.slug.current}`;
              const isPrimary = index === 0;
              return (
                <Link
                  key={service._id}
                  href={href}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    isPrimary
                      ? "bg-white text-gray-900 hover:bg-neutral-100"
                      : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
                  }`}
                >
                  {service.title}
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Services Overview */}
      {services.length > 0 && (
        <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Our Services</h2>
            <ServicePreviews
              section={{
                heading: "Explore Our Services",
                services: services,
              }}
            />
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
