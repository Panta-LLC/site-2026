require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@sanity/client");
const fs = require("node:fs");
const path = require("node:path");

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
  const file = path.join(__dirname, "../seed/services.json");
  const raw = fs.readFileSync(file, "utf-8");
  const services = JSON.parse(raw);

  console.log(`Importing ${services.length} services...`);

  for (const service of services) {
    const slug = service.slug.current;
    
    // Check if service already exists
    const existing = await client.fetch(
      '*[_type == "service" && slug.current == $slug][0] { _id }',
      { slug }
    );

    if (existing && existing._id) {
      await client.patch(existing._id).set(service).commit();
      console.log(`Updated service: ${service.title} (${slug})`);
    } else {
      const created = await client.create(service);
      console.log(`Created service: ${service.title} (${slug}) - ID: ${created._id}`);
    }
  }

  console.log("All services imported successfully!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

