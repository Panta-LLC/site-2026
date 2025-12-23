import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Sections/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: "Panta",
    menu: [
      { title: "Home", url: "/" },
      { title: "Services", url: "/services" },
      { title: "About", url: "/about" },
      { title: "Contact", url: "/contact" },
    ],
  },
};

export const WithLogo: Story = {
  args: {
    title: "Panta",
    logo: {
      asset: {
        url: "https://via.placeholder.com/150x50",
      },
      alt: "Panta Logo",
    },
    menu: [
      { title: "Home", url: "/" },
      { title: "Services", url: "/services" },
      { title: "About", url: "/about" },
    ],
  },
};

export const WithNotification: Story = {
  args: {
    title: "Panta",
    menu: [
      { title: "Home", url: "/" },
      { title: "Services", url: "/services" },
    ],
    notificationBar: {
      enabled: true,
      text: "New feature available! Check it out.",
      url: "/features",
      tone: "success",
    },
  },
};

