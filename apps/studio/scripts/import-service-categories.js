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
  const file = path.join(__dirname, "../seed/serviceCategories.json");
  const raw = fs.readFileSync(file, "utf-8");
  const categories = JSON.parse(raw);

  console.log(`Importing ${categories.length} service categories...`);

  for (const category of categories) {
    const value = category.value;
    
    // Check if category already exists
    const existing = await client.fetch(
      '*[_type == "serviceCategory" && value == $value][0] { _id }',
      { value }
    );

    if (existing && existing._id) {
      await client.patch(existing._id).set(category).commit();
      console.log(`Updated category: ${category.title} (${value})`);
    } else {
      const created = await client.create(category);
      console.log(`Created category: ${category.title} (${value}) - ID: ${created._id}`);
    }
  }

  console.log("All service categories imported successfully!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

