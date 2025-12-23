/**
 * Script to delete all digital marketing/strategy content from Sanity
 * This includes:
 * - Digital Marketing service category
 * - All services in the marketing category
 * - Any references to marketing in pages
 */

require("dotenv").config({ path: require("path").join(__dirname, "../.env.local") });
const { createClient } = require("@sanity/client");
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

async function deleteMarketingContent() {
  try {
    console.log("🔍 Finding digital marketing content...\n");

    // 1. Find all services in the marketing category (including drafts)
    const marketingServices = await client.fetch(
      `*[_type == "service" && category->value == "marketing"]{
        _id,
        title,
        slug
      }`
    );

    // Also find draft services
    const draftMarketingServices = await client.fetch(
      `*[_type == "service" && _id match "drafts.*" && category->value == "marketing"]{
        _id,
        title,
        slug
      }`
    );

    const allMarketingServices = [...marketingServices, ...draftMarketingServices];
    
    console.log(`Found ${allMarketingServices.length} marketing service(s) (${marketingServices.length} published, ${draftMarketingServices.length} drafts):`);
    allMarketingServices.forEach((service) => {
      console.log(`  - ${service.title} (${service._id})`);
    });

    // 2. Find the marketing category (including drafts)
    const marketingCategory = await client.fetch(
      `*[_type == "serviceCategory" && value == "marketing" && !(_id match "drafts.*")][0]{
        _id,
        title,
        value
      }`
    );

    const draftMarketingCategory = await client.fetch(
      `*[_type == "serviceCategory" && value == "marketing" && _id match "drafts.*"][0]{
        _id,
        title,
        value
      }`
    );

    if (marketingCategory) {
      console.log(`\nFound marketing category: ${marketingCategory.title} (${marketingCategory._id})`);
    }
    if (draftMarketingCategory) {
      console.log(`Found draft marketing category: ${draftMarketingCategory.title} (${draftMarketingCategory._id})`);
    }
    if (!marketingCategory && !draftMarketingCategory) {
      console.log("\n⚠️  Marketing category not found");
    }

    // 3. Find pages that reference marketing
    const pagesWithMarketing = await client.fetch(
      `*[_type == "page" && (title match "*marketing*" || defined(sections[].content[].children[].text match "*marketing*"))]{
        _id,
        title,
        slug
      }`
    );

    console.log(`\nFound ${pagesWithMarketing.length} page(s) with marketing references:`);
    pagesWithMarketing.forEach((page) => {
      console.log(`  - ${page.title || "Untitled"} (${page._id})`);
    });

    // 4. Delete services first (they reference the category)
    // Delete drafts first, then published
    if (allMarketingServices.length > 0) {
      console.log("\n🗑️  Deleting marketing services...");
      for (const service of allMarketingServices) {
        try {
          await client.delete(service._id);
          console.log(`  ✓ Deleted service: ${service.title} (${service._id})`);
        } catch (error) {
          console.error(`  ✗ Failed to delete ${service.title}:`, error.message);
        }
      }
    }

    // 5. Delete the marketing category (drafts first, then published)
    if (draftMarketingCategory) {
      console.log("\n🗑️  Deleting draft marketing category...");
      try {
        await client.delete(draftMarketingCategory._id);
        console.log(`  ✓ Deleted draft category: ${draftMarketingCategory.title}`);
      } catch (error) {
        console.error(`  ✗ Failed to delete draft category:`, error.message);
      }
    }
    
    if (marketingCategory) {
      console.log("\n🗑️  Deleting marketing category...");
      try {
        await client.delete(marketingCategory._id);
        console.log(`  ✓ Deleted category: ${marketingCategory.title}`);
      } catch (error) {
        console.error(`  ✗ Failed to delete category:`, error.message);
        if (error.message.includes("references")) {
          console.error("  ⚠️  Category still has references. Checking for remaining references...");
          
          // Find any remaining references
          const remainingRefs = await client.fetch(
            `*[references($categoryId)]{
              _id,
              _type,
              title
            }`,
            { categoryId: marketingCategory._id }
          );
          
          if (remainingRefs.length > 0) {
            console.error(`  Found ${remainingRefs.length} remaining reference(s):`);
            remainingRefs.forEach((ref) => {
              console.error(`    - ${ref._type}: ${ref.title || ref._id} (${ref._id})`);
            });
            console.error("  You may need to delete or update these documents manually.");
          }
        }
      }
    }

    // 6. Clean up marketing references from pages
    if (pagesWithMarketing.length > 0) {
      console.log("\n🧹 Cleaning marketing references from pages...");
      for (const page of pagesWithMarketing) {
        try {
          // Get full page data
          const fullPage = await client.fetch(
            `*[_id == $id][0]`,
            { id: page._id }
          );

          if (fullPage && fullPage.sections) {
            // Filter out sections with marketing content
            const cleanedSections = fullPage.sections.filter((section) => {
              if (!section.content) return true;
              
              // Check if content contains marketing references
              const hasMarketing = JSON.stringify(section.content)
                .toLowerCase()
                .includes("marketing");
              
              return !hasMarketing;
            });

            // Update page if sections changed
            if (cleanedSections.length !== fullPage.sections.length) {
              await client.patch(page._id).set({ sections: cleanedSections }).commit();
              console.log(`  ✓ Cleaned marketing references from: ${page.title || "Untitled"}`);
            }
          }
        } catch (error) {
          console.error(`  ✗ Failed to clean page ${page._id}:`, error.message);
        }
      }
    }

    console.log("\n✅ Marketing content deletion complete!");
    console.log("\nNote: You may need to manually review and update pages in Sanity Studio");
    console.log("to remove any remaining marketing references from content.");

  } catch (error) {
    console.error("❌ Error deleting marketing content:", error);
    process.exit(1);
  }
}

// Confirm before deleting
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "⚠️  This will delete all digital marketing content from Sanity. Continue? (yes/no): ",
  (answer) => {
    if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
      deleteMarketingContent();
    } else {
      console.log("Cancelled.");
      process.exit(0);
    }
    rl.close();
  }
);

