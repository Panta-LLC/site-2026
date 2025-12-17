import { getPageBySlug } from "@panta/lib/src/sanity/queries";
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

export default async function MissionPage() {
  const page = await getPageBySlug("mission");

  if (!page) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="px-6 pt-24 pb-8 sm:px-8 lg:px-12 flex content-center flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight w-[80%] max-w-[900px]">
          {page.title}
        </h1>
        {page.description && (
          <p className="text-lg mt-4 w-[70%] max-w-[900px]">{page.description}</p>
        )}
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 sm:px-8 lg:px-12 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          {page.content && (
            <div className="prose dark:prose-invert max-w-none">{renderContent(page.content)}</div>
          )}

          {/* Render CMS sections if available */}
          {page.sections?.length ? (
            <div className="mt-12">
              {page.sections.map((s: any, i: number) => (
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

export async function generateMetadata() {
  const page = await getPageBySlug("mission");

  if (!page) {
    return {
      title: "Mission | Panta LLC",
    };
  }

  return {
    title: `${page.title} | Panta LLC`,
    description: page.description || page.seo?.description,
  };
}
