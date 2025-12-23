import { defineType, defineField } from "sanity";

export default defineType({
  name: "heroCarouselSlide",
  title: "Hero Carousel Slide",
  type: "object",
  fields: [
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "string",
      description: "Small text above the title (e.g., 'Our Mission', 'Service')",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main heading for the slide",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Description text displayed on the slide",
    }),
    defineField({
      name: "linkTitle",
      title: "Link Title",
      type: "string",
      description: "Text shown in the navigation bar (defaults to title if empty)",
    }),
    defineField({
      name: "contentReference",
      title: "Content Reference",
      type: "reference",
      to: [
        { type: "page" },
        { type: "serviceCategory" },
        { type: "service" },
      ],
      description: "Link to a page, service category, or service",
      options: {
        weak: true,
      } as any,
    }),
    defineField({
      name: "customLink",
      title: "Custom Link (Override)",
      type: "string",
      description: "Optional: Override the link URL (e.g., '/mission', '/categories/consulting'). If empty, uses the content reference.",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Display order (lower numbers appear first)",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subheading: "subheading",
      order: "order",
      referenceTitle: "contentReference.title",
    },
    prepare({ title, subheading, order, referenceTitle }) {
      return {
        title: title || "Untitled Slide",
        subtitle: [
          subheading && `Subheading: ${subheading}`,
          order !== undefined && `Order: ${order}`,
          referenceTitle && `→ ${referenceTitle}`,
        ]
          .filter(Boolean)
          .join(" | "),
      };
    },
  },
});

