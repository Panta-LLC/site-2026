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
    // Hero Section Fields
    defineField({
      name: "heroHeading",
      type: "string",
      description: "Optional override for hero heading (defaults to title if empty)",
    }),
    defineField({
      name: "heroDescription",
      type: "text",
      description: "Hero section description/value proposition",
    }),
    // Overview Section
    defineField({
      name: "overview",
      type: "array",
      of: [{ type: "block" }],
      description: "Category overview content (rich text)",
    }),
    // Benefits Section
    defineField({
      name: "benefits",
      type: "array",
      of: [{ type: "benefit" }],
      description: "Key benefits or features of this category",
    }),
    // Process/Methodology Section
    defineField({
      name: "process",
      type: "array",
      of: [{ type: "block" }],
      description: "Process or methodology content (rich text)",
    }),
    // Flexible Sections
    defineField({
      name: "sections",
      type: "array",
      of: [{ type: "section" }],
      description: "Additional flexible sections (hero, features, CTA, etc.)",
    }),
    // SEO
    defineField({
      name: "seo",
      type: "seo",
      description: "SEO metadata for this category page",
    }),
    // CTA Section
    defineField({
      name: "ctaHeading",
      type: "string",
      description: "Call-to-action section heading",
    }),
    defineField({
      name: "ctaContent",
      type: "text",
      description: "Call-to-action section description",
    }),
    defineField({
      name: "ctaButtonText",
      type: "string",
      description: "CTA button text (defaults to 'Contact Us' if empty)",
      initialValue: "Contact Us",
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

