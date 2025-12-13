import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ 
      name: "category", 
      type: "string",
      options: {
        list: [
          { title: "Business/Technology Consulting", value: "consulting" },
          { title: "Product Development", value: "product" },
          { title: "Web Development", value: "web" },
          { title: "Digital Marketing", value: "marketing" },
        ],
      },
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
      category: "category",
    },
    prepare({ title, category }) {
      const categoryLabels: Record<string, string> = {
        consulting: "Business/Technology Consulting",
        product: "Product Development",
        web: "Web Development",
        marketing: "Digital Marketing",
      };
      return {
        title,
        subtitle: categoryLabels[category] || category,
      };
    },
  },
});

