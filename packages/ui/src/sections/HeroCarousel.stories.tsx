import type { Meta, StoryObj } from "@storybook/react";
import { HeroCarousel } from "./HeroCarousel";

const meta: Meta<typeof HeroCarousel> = {
  title: "Sections/HeroCarousel",
  component: HeroCarousel,
};

export default meta;
type Story = StoryObj<typeof HeroCarousel>;

const mockSlides = [
  {
    _key: "1",
    title: "Transform Your Business",
    subheading: "Innovation",
    description: "We help businesses leverage cutting-edge technology to drive growth and achieve their goals.",
    linkTitle: "Learn More",
    customLink: "/consulting",
    order: 1,
  },
  {
    _key: "2",
    title: "Product Development Excellence",
    subheading: "Development",
    description: "From concept to launch, we build products that users love and businesses rely on.",
    linkTitle: "Explore Services",
    customLink: "/product-development",
    order: 2,
  },
  {
    _key: "3",
    title: "Strategic Technology Consulting",
    subheading: "Strategy",
    description: "Expert guidance to help you make the right technology decisions for your business.",
    linkTitle: "Get Started",
    customLink: "/consulting",
    order: 3,
  },
];

export const Default: Story = {
  args: {
    slides: mockSlides,
  },
};

export const SingleSlide: Story = {
  args: {
    slides: [mockSlides[0]],
  },
};

export const NoSlides: Story = {
  args: {
    slides: [],
  },
};

export const WithContentReference: Story = {
  args: {
    slides: [
      {
        _key: "1",
        title: "Service Category",
        subheading: "Category",
        description: "This slide uses a content reference.",
        linkTitle: "View Category",
        contentReference: {
          _type: "serviceCategory",
          _id: "cat-1",
          value: "consulting",
        },
        order: 1,
      },
    ],
  },
};

