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
  // First, ensure categories exist
  console.log("Checking service categories...");
  const categories = await client.fetch('*[_type == "serviceCategory"] { _id, value }');
  
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat.value] = cat._id;
  });

  if (Object.keys(categoryMap).length === 0) {
    console.log("No service categories found. Please run: npm run import:categories");
    return;
  }

  console.log(`Found ${categories.length} categories\n`);

  // Get all services with string categories
  const services = await client.fetch(`
    *[_type == "service" && defined(category) && !(_type == "reference")]
    { _id, title, category }
  `);

  if (services.length === 0) {
    console.log("No services with string categories found. Migration not needed.");
    return;
  }

  console.log(`Found ${services.length} services to migrate...\n`);

  let updatedCount = 0;
  let skippedCount = 0;

  for (const service of services) {
    const categoryId = categoryMap[service.category];
    
    if (categoryId) {
      try {
        await client.patch(service._id).set({ 
          category: {
            _type: "reference",
            _ref: categoryId
          }
        }).commit();
        console.log(`✓ Migrated "${service.title}" (${service.category} → category reference)`);
        updatedCount++;
      } catch (error) {
        console.error(`✗ Failed to migrate "${service.title}":`, error.message);
      }
    } else {
      console.log(`- Skipped "${service.title}" (category "${service.category}" not found)`);
      skippedCount++;
    }
  }

  console.log(`\n✅ Migration complete!`);
  console.log(`   Updated: ${updatedCount}`);
  console.log(`   Skipped: ${skippedCount}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

