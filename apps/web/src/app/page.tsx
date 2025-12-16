import { getAllServiceCategories, getHomepage } from "@panta/lib/src/sanity/queries";
import { HeroCarousel } from "@panta/ui/src/sections/HeroCarousel";
import { Feature } from "@panta/ui/src/sections/Features";
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

  // Extract sections from CMS if available
  const heroSection = homepage?.sections?.find((s: any) => s.type === "hero");
  const featuresSection = homepage?.sections?.find((s: any) => s.type === "features");
  const ctaSection = homepage?.sections?.find((s: any) => s.type === "cta");

  return (
    <main>
      {/* Hero Carousel */}
      <HeroCarousel services={services} />

      {/* Why Choose Panta Section */}
      <Feature
        section={
          featuresSection || {
            type: "features",
            heading: "Why Choose Panta?",
            content: [
              {
                _type: "block",
                children: [
                  {
                    text: "We combine technical expertise with business acumen to deliver solutions that drive real results.",
                  },
                ],
              },
            ],
            benefits: [
              {
                _key: "expertise",
                title: "Expert Guidance",
                description:
                  "Our team brings years of industry experience and deep technical knowledge to every project.",
              },
              {
                _key: "strategic",
                title: "Strategic Approach",
                description:
                  "We align technology decisions with your business goals, ensuring every solution drives value.",
              },
              {
                _key: "support",
                title: "End-to-End Support",
                description:
                  "From initial strategy through implementation and beyond, we're with you every step of the way.",
              },
            ],
          }
        }
      />

      {/* Services Overview */}
      {services.length > 0 && (
        <section className="px-6 py-16 sm:px-8 lg:px-12 bg-neutral-50 dark:bg-neutral-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Our Services</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
                We offer comprehensive solutions across three core service areas, each designed to
                help your business thrive in today's digital landscape.
              </p>
            </div>
            <ServicePreviews
              section={{
                heading: "",
                serviceCategories: services,
              }}
            />
          </div>
        </section>
      )}

      {/* Process/Approach Section */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Our Approach</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
            We believe in a collaborative, transparent approach. Every project starts with
            understanding your unique challenges and goals. We then develop tailored strategies and
            work closely with your team to implement solutions that deliver measurable results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Discover</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                We begin by understanding your business, goals, and challenges through in-depth
                discovery.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Design</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                We develop strategic solutions tailored to your needs, with clear roadmaps and
                timelines.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Deliver</h3>
              <p className="text-neutral-600 dark:text-neutral-300">
                We implement solutions with precision and provide ongoing support to ensure your
                success.
              </p>
            </div>
          </div>
        </div>
      </section>

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
