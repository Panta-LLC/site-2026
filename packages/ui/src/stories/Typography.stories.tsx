import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Design Tokens/Typography",
};

export default meta;
type Story = StoryObj;

export const Headings: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Heading 1 (H1)
        </h1>
        <p className="text-sm text-neutral-600">text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight</p>
      </div>
      <div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Heading 2 (H2)</h2>
        <p className="text-sm text-neutral-600">text-3xl md:text-4xl font-bold tracking-tight</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-4">Heading 3 (H3)</h3>
        <p className="text-sm text-neutral-600">text-2xl font-bold</p>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-4">Heading 4 (H4)</h4>
        <p className="text-sm text-neutral-600">text-xl font-bold</p>
      </div>
      <div>
        <h5 className="text-lg font-semibold mb-4">Heading 5 (H5)</h5>
        <p className="text-sm text-neutral-600">text-lg font-semibold</p>
      </div>
      <div>
        <h6 className="text-base font-semibold mb-4">Heading 6 (H6)</h6>
        <p className="text-sm text-neutral-600">text-base font-semibold</p>
      </div>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <p className="text-2xl mb-4">Large Body Text (text-2xl)</p>
        <p className="text-2xl text-neutral-700">
          This is large body text used for prominent descriptions and key messaging.
        </p>
      </div>
      <div>
        <p className="text-xl mb-4">Body Text (text-xl)</p>
        <p className="text-xl text-neutral-700">
          This is standard body text used for paragraphs and general content.
        </p>
      </div>
      <div>
        <p className="text-lg mb-4">Medium Body Text (text-lg)</p>
        <p className="text-lg text-neutral-700">
          This is medium body text used for secondary content and descriptions.
        </p>
      </div>
      <div>
        <p className="text-base mb-4">Base Body Text (text-base)</p>
        <p className="text-base text-neutral-700">
          This is base body text, the default size for most content. It provides good readability
          and is suitable for longer paragraphs and general text content.
        </p>
      </div>
      <div>
        <p className="text-sm mb-4">Small Body Text (text-sm)</p>
        <p className="text-sm text-neutral-700">
          This is small body text used for captions, metadata, and supplementary information.
        </p>
      </div>
    </div>
  ),
};

export const FontFamilies: Story = {
  render: () => (
    <div className="space-y-8 p-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Sans Serif (Default)</h3>
        <p className="font-sans text-lg">
          Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans,
          Helvetica Neue, Arial, sans-serif
        </p>
        <p className="font-sans text-base text-neutral-600 mt-2">
          Used for body text, headings, and most UI elements.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Serif</h3>
        <p className="font-serif text-lg">
          caecilia, Georgia, Times New Roman, Times, serif
        </p>
        <p className="font-serif text-base text-neutral-600 mt-2">
          Used for special typography needs and decorative text.
        </p>
      </div>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <div>
        <p className="font-thin text-2xl mb-2">Thin (font-thin)</p>
        <p className="text-sm text-neutral-600">100</p>
      </div>
      <div>
        <p className="font-light text-2xl mb-2">Light (font-light)</p>
        <p className="text-sm text-neutral-600">300</p>
      </div>
      <div>
        <p className="font-normal text-2xl mb-2">Normal (font-normal)</p>
        <p className="text-sm text-neutral-600">400</p>
      </div>
      <div>
        <p className="font-medium text-2xl mb-2">Medium (font-medium)</p>
        <p className="text-sm text-neutral-600">500</p>
      </div>
      <div>
        <p className="font-semibold text-2xl mb-2">Semibold (font-semibold)</p>
        <p className="text-sm text-neutral-600">600</p>
      </div>
      <div>
        <p className="font-bold text-2xl mb-2">Bold (font-bold)</p>
        <p className="text-sm text-neutral-600">700</p>
      </div>
    </div>
  ),
};

export const TextStyles: Story = {
  render: () => (
    <div className="space-y-6 p-8">
      <div>
        <p className="uppercase text-lg mb-2">Uppercase Text</p>
        <p className="text-sm text-neutral-600">uppercase</p>
      </div>
      <div>
        <p className="lowercase text-lg mb-2">Lowercase Text</p>
        <p className="text-sm text-neutral-600">lowercase</p>
      </div>
      <div>
        <p className="capitalize text-lg mb-2">Capitalize Text</p>
        <p className="text-sm text-neutral-600">capitalize</p>
      </div>
      <div>
        <p className="tracking-tight text-lg mb-2">Tight Tracking</p>
        <p className="text-sm text-neutral-600">tracking-tight</p>
      </div>
      <div>
        <p className="tracking-normal text-lg mb-2">Normal Tracking</p>
        <p className="text-sm text-neutral-600">tracking-normal</p>
      </div>
      <div>
        <p className="tracking-wide text-lg mb-2">Wide Tracking</p>
        <p className="text-sm text-neutral-600">tracking-wide</p>
      </div>
      <div>
        <p className="leading-relaxed text-lg mb-2">Relaxed Leading</p>
        <p className="text-sm text-neutral-600">leading-relaxed</p>
      </div>
    </div>
  ),
};

