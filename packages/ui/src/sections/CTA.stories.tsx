import type { Meta, StoryObj } from "@storybook/react";
import { CTA } from "./CTA";

const meta: Meta<typeof CTA> = {
  title: "Sections/CTA",
  component: CTA,
};

export default meta;
type Story = StoryObj<typeof CTA>;

export const Default: Story = {
  args: {
    heading: "Ready to Get Started?",
    content: "Let's discuss how we can help you achieve your goals.",
    buttonText: "Contact Us",
    buttonLink: "/contact",
  },
};

export const WithSection: Story = {
  args: {
    section: {
      heading: "Transform Your Business Today",
      content: "Join hundreds of companies that trust us to deliver exceptional results.",
      buttonText: "Schedule a Consultation",
      buttonLink: "/consulting",
    },
  },
};

export const WithRichContent: Story = {
  args: {
    section: {
      heading: "Get in Touch",
      content: [
        {
          _type: "block",
          _key: "1",
          children: [
            {
              _type: "span",
              text: "We're here to help you succeed. ",
            },
            {
              _type: "span",
              text: "Contact us today to learn more.",
              marks: ["strong"],
            },
          ],
        },
      ],
      buttonText: "Contact Us",
      buttonLink: "/contact",
    },
  },
};

