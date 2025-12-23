import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/Colors",
};

export default meta;
type Story = StoryObj;

const colorPalette = {
  brand: {
    DEFAULT: "#002642",
    dark: "#02040f",
    accent: "#840032",
    highlight: "#FFA90A",
    light: "#e5dada",
  },
  primary: {
    DEFAULT: "#002642",
    dark: "#02040f",
  },
  accent: {
    DEFAULT: "#840032",
  },
  highlight: {
    DEFAULT: "#e59500",
  },
  light: {
    DEFAULT: "#e5dada",
  },
};

const ColorSwatch = ({ name, value, className }: { name: string; value: string; className: string }) => (
  <div className="flex flex-col items-center p-4 border border-neutral-200 rounded-lg">
    <div className={`w-24 h-24 rounded-lg mb-3 ${className}`}></div>
    <div className="text-center">
      <p className="font-semibold text-sm">{name}</p>
      <p className="text-xs text-neutral-600 mt-1 font-mono">{value}</p>
    </div>
  </div>
);

export const BrandColors: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ColorSwatch name="Brand" value={colorPalette.brand.DEFAULT} className="bg-brand" />
          <ColorSwatch name="Brand Dark" value={colorPalette.brand.dark} className="bg-brand-dark" />
          <ColorSwatch name="Brand Accent" value={colorPalette.brand.accent} className="bg-brand-accent" />
          <ColorSwatch name="Brand Highlight" value={colorPalette.brand.highlight} className="bg-brand-highlight" />
          <ColorSwatch name="Brand Light" value={colorPalette.brand.light} className="bg-brand-light" />
        </div>
      </div>
    </div>
  ),
};

export const PrimaryColors: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Primary Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ColorSwatch name="Primary" value={colorPalette.primary.DEFAULT} className="bg-primary" />
          <ColorSwatch name="Primary Dark" value={colorPalette.primary.dark} className="bg-primary-dark" />
        </div>
      </div>
    </div>
  ),
};

export const AccentColors: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Accent Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ColorSwatch name="Accent" value={colorPalette.accent.DEFAULT} className="bg-accent" />
          <ColorSwatch name="Highlight" value={colorPalette.highlight.DEFAULT} className="bg-highlight" />
          <ColorSwatch name="Light" value={colorPalette.light.DEFAULT} className="bg-light" />
        </div>
      </div>
    </div>
  ),
};

export const NeutralColors: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Neutral Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <ColorSwatch name="Neutral 50" value="#fafafa" className="bg-neutral-50" />
          <ColorSwatch name="Neutral 100" value="#f5f5f5" className="bg-neutral-100" />
          <ColorSwatch name="Neutral 200" value="#e5e5e5" className="bg-neutral-200" />
          <ColorSwatch name="Neutral 300" value="#d4d4d4" className="bg-neutral-300" />
          <ColorSwatch name="Neutral 400" value="#a3a3a3" className="bg-neutral-400" />
          <ColorSwatch name="Neutral 500" value="#737373" className="bg-neutral-500" />
          <ColorSwatch name="Neutral 600" value="#525252" className="bg-neutral-600" />
          <ColorSwatch name="Neutral 700" value="#404040" className="bg-neutral-700" />
          <ColorSwatch name="Neutral 800" value="#262626" className="bg-neutral-800" />
          <ColorSwatch name="Neutral 900" value="#171717" className="bg-neutral-900" />
        </div>
      </div>
    </div>
  ),
};

export const ColorUsage: Story = {
  render: () => (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Color Usage Examples</h2>
        <div className="space-y-4">
          <div className="p-6 bg-brand text-white rounded-lg">
            <h3 className="text-xl font-bold mb-2">Brand Background</h3>
            <p>bg-brand text-white</p>
          </div>
          <div className="p-6 bg-highlight text-white rounded-lg">
            <h3 className="text-xl font-bold mb-2">Highlight Background</h3>
            <p>bg-highlight text-white</p>
          </div>
          <div className="p-6 bg-accent text-white rounded-lg">
            <h3 className="text-xl font-bold mb-2">Accent Background</h3>
            <p>bg-accent text-white</p>
          </div>
          <div className="p-6 bg-light text-neutral-900 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Light Background</h3>
            <p>bg-light text-neutral-900</p>
          </div>
          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-lg">
            <h3 className="text-xl font-bold mb-2 text-neutral-900">Neutral Background</h3>
            <p className="text-neutral-700">bg-neutral-50 text-neutral-900</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

