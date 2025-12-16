import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  // Provide a clear runtime error for missing configuration
  throw new Error(
    "Sanity configuration error: missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET"
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2023-10-01",
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN,
});

// Export queries service
export * from "./queries";
