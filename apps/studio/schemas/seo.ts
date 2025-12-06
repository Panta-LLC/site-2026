import { defineType, defineField } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "description", type: "text" }),
    defineField({ name: "ogImage", type: "image" }),
    defineField({ name: "keywords", type: "array", of: [{ type: "string" }] }),
  ],
});
