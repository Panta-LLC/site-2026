import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";

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
  const file = path.join(__dirname, "../seed/home.json");
  const raw = fs.readFileSync(file, "utf-8");
  const doc = JSON.parse(raw);

  // Upsert by slug 'home'
  const existing = await client.fetch('*[_type == "page" && slug.current == "home"][0] { _id }');

  if (existing?._id) {
    await client.patch(existing._id).set(doc).commit();
    console.log("Updated existing home page:", existing._id);
  } else {
    const created = await client.create(doc);
    console.log("Created new home page:", created._id);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
