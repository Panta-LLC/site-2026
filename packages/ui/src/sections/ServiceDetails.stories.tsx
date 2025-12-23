import type { Meta, StoryObj } from "@storybook/react";
import { ServiceDetails } from "./ServiceDetails";

const meta: Meta<typeof ServiceDetails> = {
  title: "Sections/ServiceDetails",
  component: ServiceDetails,
};

export default meta;
type Story = StoryObj<typeof ServiceDetails>;

export const Default: Story = {
  args: {
    section: {
      heading: "Our Services",
      content: [
        {
          _type: "block",
          _key: "1",
          children: [
            {
              _type: "span",
              text: "We offer comprehensive technology solutions tailored to your business needs.",
            },
          ],
        },
      ],
      serviceList: [
        "Strategic Technology Consulting",
        "Product Development",
        "Web Development",
        "Mobile App Development",
        "Digital Marketing",
      ],
    },
  },
};

export const ContentOnly: Story = {
  args: {
    section: {
      heading: "About Our Approach",
      content: [
        {
          _type: "block",
          _key: "1",
          children: [
            {
              _type: "span",
              text: "We take a holistic approach to technology, ensuring that every solution aligns with your business objectives and delivers measurable results.",
            },
          ],
        },
      ],
    },
  },
};

export const ServiceListOnly: Story = {
  args: {
    section: {
      serviceList: [
        "Custom Software Development",
        "Cloud Migration",
        "DevOps Implementation",
        "Security Audits",
      ],
    },
  },
};

