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

