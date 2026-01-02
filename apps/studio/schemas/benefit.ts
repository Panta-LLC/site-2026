import { defineType, defineField } from "sanity";

export default defineType({
  name: "benefit",
  title: "Benefit",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      description: "Brief description of this benefit (1-2 sentences)",
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "Optional icon name or identifier",
    }),
    defineField({
      name: "ctaText",
      type: "string",
      title: "CTA Button Text",
      description: "Optional: Text for the call-to-action button (e.g., 'Learn More', 'Get Started')",
    }),
    defineField({
      name: "ctaModalMode",
      type: "string",
      title: "CTA Modal Mode",
      description: "Optional: Which modal template to open when CTA is clicked",
      options: {
        list: [
          { title: "Schedule a Call", value: "schedule" },
          { title: "Send a Message", value: "message" },
          { title: "Strategic Consulting", value: "consulting" },
          { title: "Product Development", value: "product" },
          { title: "Media & Digital Presence", value: "media" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
    },
    prepare({ title, description }) {
      return {
        title: title || "Untitled Benefit",
        subtitle: description,
      };
    },
  },
});

