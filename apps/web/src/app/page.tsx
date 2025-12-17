import {
  getAllServiceCategories,
  getHomepage,
  getMissionPage,
} from "@panta/lib/src/sanity/queries";
import { HeroCarousel } from "@panta/ui/src/sections/HeroCarousel";
import { ServicePreviews } from "@panta/ui/src/sections/ServicePreviews";
import { CTA } from "@panta/ui/src/sections/CTA";
import { Footer } from "@panta/ui/src/sections/Footer";

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
  const services = await getAllServiceCategories();
  const homepage = await getHomepage();
  const missionPage = await getMissionPage();

  // Extract sections from CMS if available
  const heroSection = homepage?.sections?.find((s: any) => s.type === "hero");
  const ctaSection = homepage?.sections?.find((s: any) => s.type === "cta");

  return (
    <main>
      {/* Hero Carousel */}
      <HeroCarousel services={services} missionPage={missionPage} />

      {/* Services Overview */}
      {services.length > 0 && (
        <section className="px-6 py-10 sm:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            {/* <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Services</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                We offer comprehensive solutions across our core service areas, each designed to
                help your business thrive in today's digital landscape.
              </p>
            </div> */}
            <ServicePreviews
              section={{
                heading: undefined,
                serviceCategories: services,
              }}
            />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTA
        section={
          ctaSection || {
            heading: "Ready to Get Started?",
            content:
              "Let's discuss how Panta can help transform your business. Whether you need strategic consulting, product development, or web solutions, we're here to help you succeed.",
            buttonText: "Contact Us Today",
            buttonLink: "/consulting",
          }
        }
      />

      <Footer />
    </main>
  );
}

export async function generateMetadata() {
  return {
    title: "Panta LLC | Technology Consulting, Product Development & Web Solutions",
    description:
      "Panta delivers comprehensive technology consulting, product development, and web solutions. We partner with businesses to turn innovative ideas into reality and drive growth through cutting-edge technology.",
    keywords: [
      "technology consulting",
      "product development",
      "web development",
      "business technology",
      "technology strategy",
      "web design",
      "technology implementation",
    ],
  };
}
