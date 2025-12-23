import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "description",
      type: "text",
      description: "Short description for carousel/hero use",
    }),
    defineField({
      name: "content",
      title: "Content",
      description: "WYSIWYG content for the page (Portable Text)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "sections", type: "array", of: [{ type: "section" }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
});
