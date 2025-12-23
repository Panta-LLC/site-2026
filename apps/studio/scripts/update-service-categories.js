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
  const services = await client.fetch('*[_type == "service"] { _id, title, category }');
  
  if (services.length === 0) {
    console.log("No services found.");
    return;
  }

  console.log(`Found ${services.length} services to update...\n`);

  const categoryUpdates = {
    // Old categories that should be updated to "product-web"
    product: "product-web",
    web: "product-web",
    // "consulting" stays as "consulting" but the label changed
  };

  let updatedCount = 0;
  let skippedCount = 0;

  for (const service of services) {
    const newCategory = categoryUpdates[service.category];
    
    if (newCategory && newCategory !== service.category) {
      try {
        await client.patch(service._id).set({ category: newCategory }).commit();
        console.log(`✓ Updated "${service.title}" (${service.category} → ${newCategory})`);
        updatedCount++;
      } catch (error) {
        console.error(`✗ Failed to update "${service.title}":`, error.message);
      }
    } else {
      console.log(`- Skipped "${service.title}" (category: ${service.category})`);
      skippedCount++;
    }
  }

  console.log(`\n✅ Update complete!`);
  console.log(`   Updated: ${updatedCount}`);
  console.log(`   Skipped: ${skippedCount}`);
  console.log(`\nNote: Category labels have been updated in the schema.`);
  console.log(`      Services with "product" or "web" categories are now "product-web".`);
  console.log(`      Services with "consulting" category remain unchanged (label updated in schema).`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

