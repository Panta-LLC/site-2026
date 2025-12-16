/**
 * Script to find and delete draft documents that reference a specific document
 * Usage: node delete-draft-references.js <documentId>
 * 
 * This is useful when you get errors about draft documents preventing deletion
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

async function deleteDraftReferences(documentId) {
  try {
    console.log(`🔍 Finding draft documents that reference: ${documentId}\n`);

    // Find all draft documents that reference this document
    const draftRefs = await client.fetch(
      `*[_id match "drafts.*" && references($docId)]{
        _id,
        _type,
        title,
        "references": [references($docId)]
      }`,
      { docId: documentId }
    );

    if (draftRefs.length === 0) {
      console.log("✅ No draft documents found referencing this document.");
      return;
    }

    console.log(`Found ${draftRefs.length} draft document(s) referencing ${documentId}:\n`);
    draftRefs.forEach((doc, index) => {
      console.log(`${index + 1}. ${doc._type}: ${doc.title || doc._id}`);
      console.log(`   ID: ${doc._id}\n`);
    });

    // Confirm deletion
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      `⚠️  Delete ${draftRefs.length} draft document(s)? (yes/no): `,
      async (answer) => {
        if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
          console.log("\n🗑️  Deleting draft documents...\n");
          
          for (const doc of draftRefs) {
            try {
              await client.delete(doc._id);
              console.log(`  ✓ Deleted: ${doc._type} - ${doc.title || doc._id}`);
            } catch (error) {
              console.error(`  ✗ Failed to delete ${doc._id}:`, error.message);
            }
          }
          
          console.log("\n✅ Draft references deleted!");
          console.log("You can now try deleting the original document again.");
        } else {
          console.log("Cancelled.");
        }
        rl.close();
        process.exit(0);
      }
    );

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

// Get document ID from command line
const documentId = process.argv[2];

if (!documentId) {
  console.error("Usage: node delete-draft-references.js <documentId>");
  console.error("Example: node delete-draft-references.js zTE356AfCdNYfvw85n2Gp4");
  process.exit(1);
}

deleteDraftReferences(documentId);

