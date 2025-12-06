import { defineType, defineField } from "sanity";

export default defineType({
  name: "section",
  title: "Section",
  type: "object",
  fields: [
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Rich Text", value: "richText" },
          { title: "Hero", value: "hero" },
          { title: "Features", value: "features" },
          { title: "CTA", value: "cta" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "content",
      title: "Content",
      description: "WYSIWYG content (Portable Text)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "image", type: "image" }),
  ],
});
