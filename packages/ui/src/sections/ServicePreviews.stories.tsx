import type { Meta, StoryObj } from "@storybook/react";
import { ServicePreviews } from "./ServicePreviews";

const meta: Meta<typeof ServicePreviews> = {
  title: "Sections/ServicePreviews",
  component: ServicePreviews,
};

export default meta;
type Story = StoryObj<typeof ServicePreviews>;

const mockServiceCategories = [
  {
    _id: "1",
    title: "Technology Consulting",
    value: "consulting",
    description: "Strategic guidance to help you make the right technology decisions.",
    mainHeading: "Services",
  },
  {
    _id: "2",
    title: "Product Development",
    value: "product-development",
    description: "From concept to launch, we build products that users love.",
    mainHeading: "Services",
  },
  {
    _id: "3",
    title: "Media & Design",
    value: "media-design",
    description: "Compelling visual communications that strengthen your brand.",
    mainHeading: "Services",
  },
];

export const Default: Story = {
  args: {
    section: {
      heading: "Our Services",
      serviceCategories: mockServiceCategories,
    },
  },
};

export const WithImages: Story = {
  args: {
    section: {
      serviceCategories: mockServiceCategories.map((cat) => ({
        ...cat,
        previewImage: {
          asset: {
            url: "https://via.placeholder.com/400x300",
          },
          alt: `${cat.title} preview`,
        },
      })),
    },
  },
};

export const LegacyServices: Story = {
  args: {
    section: {
      services: [
        {
          _id: "1",
          title: "Web Development",
          description: "Custom web applications built with modern technologies.",
          slug: { current: "web-development" },
        },
        {
          _id: "2",
          title: "Mobile Apps",
          description: "Native and cross-platform mobile applications.",
          slug: { current: "mobile-apps" },
        },
      ],
    },
  },
};

