import { Hero } from "../../../../packages/ui/src/sections/Hero";
import { Features } from "../../../../packages/ui/src/sections/Features";
import { CTA } from "../../../../packages/ui/src/sections/CTA";
import { Footer } from "../../../../packages/ui/src/sections/Footer";
import { sanityClient } from "../../../../packages/lib/src/sanity/client";

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

const Section = ({ section }: { section: any }) => {
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    default:
      return null;
  }
};

export default async function HomePage() {
  const data = await getHomepage();
  return (
    <main>
      <Hero />
      {/* <Features /> */}
      {/* Render CMS sections if available */}
      {data?.sections?.length ? (
        <section className="px-6 py-12 max-w-4xl mx-auto">
          {console.log("data.sections", data.sections)}
          {data.sections.map((s: any, i: number) => (
            <Section key={i} section={s} />
          ))}
        </section>
      ) : null}
      {/* <CTA /> */}
      <Footer />
    </main>
  );
}
