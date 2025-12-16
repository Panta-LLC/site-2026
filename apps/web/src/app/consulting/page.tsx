import { Hero } from "@panta/ui/src/sections/Hero";
import { Feature } from "@panta/ui/src/sections/Features";
import { ServicePreviews } from "@panta/ui/src/sections/ServicePreviews";
import { CTA } from "@panta/ui/src/sections/CTA";
import { Footer } from "@panta/ui/src/sections/Footer";
import { sanityClient } from "@panta/lib/src/sanity/client";
import HomeSplash from "../../components/HomeSplash";

async function getConsultingPage() {
  const query = `*[_type == "page" && slug.current == "home"][0]{
    title,
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
    }
  }`;
  try {
    const data = await sanityClient.fetch(query);
    return data;
  } catch (e) {
    return null;
  }
}

const Section = ({ section }: { section: any }) => {
  console.log("Rendering section of type:", section.type);
  switch (section.type) {
    case "hero":
      return <Hero section={section} />;
    case "feature":
    case "features":
      return <Feature section={section} />;
    case "servicePreviews":
      return <ServicePreviews section={section} />;
    default:
      return null;
  }
};

export default async function ConsultingPage() {
  const data = await getConsultingPage();
  return (
    <HomeSplash>
      <main>
        {data?.sections?.length ? (
          <section className="mx-auto">
            {data.sections.map((s: any, i: number) => (
              <Section key={i} section={s} />
            ))}
          </section>
        ) : null}
        <Footer />
      </main>
    </HomeSplash>
  );
}
