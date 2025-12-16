/**
 * Script to find all services that reference a specific category
 * Usage: node find-category-references.js <categoryId>
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@sanity/client");
const path = require("node:path");

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET;
const token = process.env.SANITY_STUDIO_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET env vars");
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2023-10-01",
  token,
});

async function findCategoryReferences(categoryId) {
  try {
    // Find all services that reference this category
    const query = `*[_type == "service" && references($categoryId)]{
      _id,
      title,
      "category": category->{
        _id,
        title,
        value
      },
      slug
    }`;
    
    const services = await client.fetch(query, { categoryId });
    
    if (services.length === 0) {
      console.log(`✅ No services reference category ${categoryId}`);
      return;
    }
    
    console.log(`\n⚠️  Found ${services.length} service(s) referencing this category:\n`);
    services.forEach((service, index) => {
      console.log(`${index + 1}. ${service.title}`);
      console.log(`   ID: ${service._id}`);
      console.log(`   Category: ${service.category?.title || "Missing"} (${service.category?._id || "N/A"})`);
      console.log(`   Slug: ${service.slug?.current || "N/A"}`);
      console.log("");
    });
    
    console.log("To delete this category, you need to:");
    console.log("1. Update or delete the services listed above");
    console.log("2. Or reassign them to a different category");
    console.log("3. Then try deleting the category again\n");
    
  } catch (error) {
    console.error("Error finding references:", error);
  }
}

// Get category ID from command line
const categoryId = process.argv[2];

if (!categoryId) {
  console.error("Usage: node find-category-references.js <categoryId>");
  console.error("Example: node find-category-references.js zTE356AfCdNYfvw85n2Gp4");
  process.exit(1);
}

findCategoryReferences(categoryId);

