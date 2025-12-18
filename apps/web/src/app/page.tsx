import { getHomepage } from "@panta/lib/src/sanity/queries";
import { HeroCarousel } from "@panta/ui/src/sections/HeroCarousel";

export default async function HomePage() {
  const homepage = await getHomepage();

  const heroCarouselSection = homepage?.sections?.find((s: any) => s.type === "heroCarousel");

  return (
    <main>
      <HeroCarousel slides={heroCarouselSection?.slides} />
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
