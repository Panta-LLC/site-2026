import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas";

export default defineConfig({
  name: "panta-studio",
  title: "Panta CMS",
  // Studio should use SANITY_STUDIO_* env vars
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "",
  plugins: [deskTool(), visionTool()],
  schema: { types: schemas },
});
