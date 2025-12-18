import type { Meta, StoryObj } from "@storybook/react";
import { Feature } from "./Features";

const meta: Meta<typeof Feature> = {
  title: "Sections/Features",
  component: Feature,
};

export default meta;
type Story = StoryObj<typeof Feature>;

export const Default: Story = {
  args: {},
};

export const WithHeading: Story = {
  args: {
    section: {
      heading: "Why Choose Us",
      content: "We deliver exceptional results through innovative solutions.",
    },
  },
};

export const WithBenefits: Story = {
  args: {
    section: {
      heading: "Our Benefits",
      content: "Discover what makes us different.",
      benefits: [
        {
          _key: "1",
          title: "Expert Team",
          description: "Our team brings years of experience and expertise to every project.",
        },
        {
          _key: "2",
          title: "Proven Results",
          description: "We have a track record of delivering successful projects on time and on budget.",
        },
        {
          _key: "3",
          title: "Innovation",
          description: "We stay ahead of the curve with the latest technologies and best practices.",
        },
      ],
    },
  },
};

