import { defineType, defineField } from "sanity";

export default defineType({
  name: "serviceCategory",
  title: "Service Category",
  type: "document",
  fields: [
    defineField({ 
      name: "title", 
      type: "string", 
      validation: (Rule) => Rule.required() 
    }),
    defineField({ 
      name: "value", 
      type: "string",
      description: "Internal identifier (slug)",
      validation: (Rule) => Rule.required().custom((value) => {
        if (!value) return true;
        // Check for spaces or special characters
        if (!/^[a-z0-9-]+$/.test(value)) {
          return "Value must be lowercase letters, numbers, and hyphens only";
        }
        return true;
      }),
    }),
    defineField({ 
      name: "description", 
      type: "text",
      description: "Optional description of this category",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Display order (lower numbers appear first)",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      value: "value",
      order: "order",
    },
    prepare({ title, value, order }) {
      return {
        title: title || value,
        subtitle: order !== undefined ? `Order: ${order} | Value: ${value}` : `Value: ${value}`,
      };
    },
  },
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});

