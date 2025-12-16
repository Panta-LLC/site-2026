import { Hero } from "@panta/ui/src/sections/Hero";
import { Feature } from "@panta/ui/src/sections/Features";
import { Footer } from "@panta/ui/src/sections/Footer";
import { sanityClient } from "@panta/lib/src/sanity/client";

async function getMediaDesignPage() {
  const query = `*[_type == "service" && slug.current == "media-design"][0]{
    _id,
    title,
    category,
    description,
    slug,
    content,
    sections[]{
      type,
      heading,
      content,
      services[]->{
        _id,
        title,
        category,
        description,
        slug
      }
    },
    seo
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
    case "feature":
    case "features":
      return <Feature section={section} />;
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

export default async function MediaDesignPage() {
  const service = await getMediaDesignPage();

  if (!service) {
    return (
      <main>
        <section className="px-6 py-24 sm:px-8 lg:px-12 text-white bg-gray-900 min-h-[60vh] flex content-center flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Media Design
          </h1>
          <p className="text-lg mt-4 text-neutral-300">
            Content coming soon...
          </p>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="px-6 py-24 sm:px-8 lg:px-12 text-white bg-gray-900 min-h-[60vh] flex content-center flex-col justify-center items-center text-center">
        <div className="mb-4">
          <span className="text-sm font-semibold text-neutral-400 uppercase tracking-wide">
            Media Design
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

export async function generateMetadata() {
  const service = await getMediaDesignPage();

  if (!service) {
    return {
      title: "Media Design | Panta LLC",
      description: "Media Design services from Panta LLC",
    };
  }

  return {
    title: `${service.title} | Panta LLC`,
    description: service.description,
  };
}

