import { getHomepage } from "@panta/lib/src/sanity/queries";
import { Hero } from "@panta/ui/src/sections/Hero";
import { Feature } from "@panta/ui/src/sections/Features";
import { ServicePreviews } from "@panta/ui/src/sections/ServicePreviews";
import { ServiceDetails } from "@panta/ui/src/sections/ServiceDetails";
import { CTA } from "@panta/ui/src/sections/CTA";
import { Footer } from "@panta/ui/src/sections/Footer";
import HomeSplash from "../../components/HomeSplash";

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
    case "serviceDetails":
      return <ServiceDetails section={section} />;
    case "cta":
      return <CTA section={section} />;
    default:
      return null;
  }
};

export default async function ConsultingPage() {
  const data = await getHomepage();
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
