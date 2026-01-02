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
          { title: "Hero Carousel", value: "heroCarousel" },
          { title: "Features", value: "features" },
          { title: "CTA", value: "cta" },
          { title: "Image", value: "image" },
          { title: "Service Previews", value: "servicePreviews" },
          { title: "Service Details", value: "serviceDetails" },
          { title: "Process", value: "process" },
          { title: "Who This Is For", value: "whoThisIsFor" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "services",
      title: "Services",
      description: "Legacy: Individual services (use serviceCategories instead)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      hidden: ({ parent }) => parent?.type !== "servicePreviews",
    }),
    defineField({
      name: "serviceCategories",
      title: "Service Categories",
      description: "Service categories to display (recommended)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "serviceCategory" }] }],
      hidden: ({ parent }) => parent?.type !== "servicePreviews",
    }),
    defineField({ name: "heading", type: "string" }),
    defineField({
      name: "content",
      title: "Content",
      description: "WYSIWYG content (Portable Text)",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Background Image",
      description: "Background image for hero section",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.type !== "hero",
    }),
    // Button fields (used by both Hero and CTA sections)
    defineField({
      name: "buttonText",
      type: "string",
      description: "Button text",
      hidden: ({ parent }) => parent?.type !== "cta" && parent?.type !== "hero",
    }),
    defineField({
      name: "buttonLink",
      type: "string",
      description: "Button link",
      hidden: ({ parent }) => parent?.type !== "cta" && parent?.type !== "hero",
    }),
    // Benefits for features section
    defineField({
      name: "benefits",
      type: "array",
      of: [{ type: "benefit" }],
      description: "Benefits/features list",
      hidden: ({ parent }) => parent?.type !== "features",
    }),
    // Service Details section fields
    // Note: Uses existing "content" field for portable text description (displays in 2 columns)
    defineField({
      name: "serviceList",
      title: "Service List",
      description: "List of services (displays in 1 column)",
      type: "array",
      of: [{ type: "string" }],
      hidden: ({ parent }) => parent?.type !== "serviceDetails",
    }),
    // Hero Carousel slides
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [{ type: "heroCarouselSlide" }],
      description: "Carousel slides",
      hidden: ({ parent }) => parent?.type !== "heroCarousel",
    }),
    // Process steps
    defineField({
      name: "steps",
      type: "array",
      of: [{ type: "benefit" }],
      description: "Process steps",
      hidden: ({ parent }) => parent?.type !== "process",
    }),
    // Who This Is For fields
    defineField({
      name: "goodFit",
      type: "array",
      of: [{ type: "string" }],
      description: "Good fit criteria",
      hidden: ({ parent }) => parent?.type !== "whoThisIsFor",
    }),
    defineField({
      name: "notGoodFit",
      type: "array",
      of: [{ type: "string" }],
      description: "Not a good fit criteria",
      hidden: ({ parent }) => parent?.type !== "whoThisIsFor",
    }),
  ],
});
