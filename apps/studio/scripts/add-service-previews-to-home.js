require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@sanity/client");

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
const token = process.env.SANITY_STUDIO_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET env vars");
}
if (!token) {
  throw new Error("Missing SANITY_STUDIO_WRITE_TOKEN env var (token with write access)");
}

const client = createClient({ projectId, dataset, token, apiVersion: "2023-10-01", useCdn: false });

async function run() {
  // Get all services
  const services = await client.fetch('*[_type == "service"] | order(title asc) { _id }');
  
  if (services.length === 0) {
    console.log("No services found. Please import services first using: npm run import:services");
    return;
  }

  // Get the home page
  const homePage = await client.fetch('*[_type == "page" && slug.current == "home"][0]');
  
  if (!homePage) {
    console.log("Home page not found. Please import home page first using: npm run import:marketing");
    return;
  }

  // Check if service previews section already exists
  const hasServicePreviews = homePage.sections?.some(
    (s) => s.type === "servicePreviews"
  );

  if (hasServicePreviews) {
    console.log("Service previews section already exists on home page.");
    return;
  }

  // Create service previews section
  const servicePreviewsSection = {
    _type: "section",
    type: "servicePreviews",
    heading: "Our Services",
    services: services.map((s) => ({
      _type: "reference",
      _ref: s._id,
    })),
  };

  // Add it after the hero section (index 1) or at the beginning if no hero
  const heroIndex = homePage.sections?.findIndex((s) => s.type === "hero") ?? -1;
  const insertIndex = heroIndex >= 0 ? heroIndex + 1 : 0;

  const updatedSections = [...(homePage.sections || [])];
  updatedSections.splice(insertIndex, 0, servicePreviewsSection);

  // Update the home page
  await client.patch(homePage._id).set({ sections: updatedSections }).commit();

  console.log(`Added service previews section to home page with ${services.length} services.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

