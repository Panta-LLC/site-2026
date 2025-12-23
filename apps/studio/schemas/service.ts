import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      options: {
        weak: true, // Allow deletion of category even if referenced
      } as any,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      description: "Short description for preview cards",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "isPrimary",
      type: "boolean",
      description: "Mark as primary service (defaults to true)",
      initialValue: true,
    }),
    defineField({
      name: "content",
      title: "Content",
      description: "Full page content (Portable Text)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "sections", type: "array", of: [{ type: "section" }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title",
      categoryTitle: "category.title",
      categoryValue: "category.value",
    },
    prepare({ title, categoryTitle, categoryValue }) {
      return {
        title,
        subtitle: categoryTitle || categoryValue || "No category",
      };
    },
  },
});
