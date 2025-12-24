import { getHomepage } from "@panta/lib/src/sanity/queries";
import { Hero } from "@panta/ui/src/sections/Hero";
import { HeroCarousel } from "@panta/ui/src/sections/HeroCarousel";
import { Feature } from "@panta/ui/src/sections/Features";
import { ServicePreviews } from "@panta/ui/src/sections/ServicePreviews";
import { Process } from "@panta/ui/src/sections/Process";
import { WhoThisIsFor } from "@panta/ui/src/sections/WhoThisIsFor";
import { CTA } from "@panta/ui/src/sections/CTA";
import { Footer } from "@panta/ui/src/sections/Footer";
import { PortableText } from "@panta/ui/src/sections/PortableText";

const Section = ({ section }: { section: any }) => {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "heroCarousel":
      return <HeroCarousel slides={section?.slides} />;
    case "features":
      return <Feature section={section} />;
    case "servicePreviews":
      return <ServicePreviews section={section} />;
    case "process":
      return <Process section={section} />;
    case "whoThisIsFor":
      return <WhoThisIsFor section={section} />;
    case "cta":
      return <CTA section={section} />;
    case "richText":
      return (
        <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
          <div className="max-w-4xl mx-auto">
            {section.heading && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-8">
                {section.heading}
              </h2>
            )}
            {section.content && (
              <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
                <PortableText content={section.content} />
              </div>
            )}
          </div>
        </section>
      );
    default:
      return null;
  }
};

export default async function HomePage() {
  let homepage;
  try {
    homepage = await getHomepage();
  } catch (error) {
    console.error("Failed to fetch homepage:", error);
  }

  // If no homepage data, show a default hero section
  if (!homepage?.sections || homepage.sections.length === 0) {
    return (
      <main>
        <Hero
          section={{
            heading: "Building Strong Digital Foundations for Growing Organizations",
            content: [
              {
                _type: "block",
                style: "normal",
                children: [
                  {
                    _type: "span",
                    text: "Strategy, product development, and media production to help businesses and mission-driven organizations operate more effectively and scale with confidence.",
                    marks: [],
                  },
                ],
                markDefs: [],
              },
            ],
            buttonText: "Start a Conversation",
            buttonLink: "/consulting",
          }}
        />
        <Feature
          section={{
            heading: "What We Do",
            benefits: [
              {
                _key: "service-1",
                title: "Strategic Consulting",
                description: "Technology and media strategy to clarify direction, evaluate systems, and identify opportunities.",
              },
              {
                _key: "service-2",
                title: "Product & App Development",
                description: "Web, SaaS, and internal tools built on strong technical foundations.",
              },
              {
                _key: "service-3",
                title: "Media & Digital Presence",
                description: "Websites, content platforms, and media systems that amplify your voice and mission.",
              },
            ],
          }}
        />
        <Footer />
      </main>
    );
  }

  return (
    <main>
      {homepage.sections.map((section: any, i: number) => (
        <Section key={i} section={section} />
      ))}
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
