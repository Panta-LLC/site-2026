import { getHomepage } from "@panta/lib/src/sanity/queries";
import { Hero } from "@panta/ui/src/sections/Hero";
import { HeroCarousel } from "@panta/ui/src/sections/HeroCarousel";
import { Feature } from "@panta/ui/src/sections/Features";
import { ServicePreviews } from "@panta/ui/src/sections/ServicePreviews";
import { Process } from "@panta/ui/src/sections/Process";
import { WhoThisIsFor } from "@panta/ui/src/sections/WhoThisIsFor";
import { CTA } from "@panta/ui/src/sections/CTA";
import { Footer } from "@panta/ui/src/sections/Footer";

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
              <div className="prose dark:prose-invert max-w-none">
                {section.content.map((block: any, i: number) => {
                  if (!block || block._type !== "block") return null;
                  const text = block.children?.map((c: any) => c.text || "").join("") || "";
                  return (
                    <p key={block._key || i} className="text-lg leading-relaxed mb-4 text-neutral-700 dark:text-neutral-300">
                      {text}
                    </p>
                  );
                })}
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
  const homepage = await getHomepage();

  return (
    <main>
      {homepage?.sections?.map((section: any, i: number) => (
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
