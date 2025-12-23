import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "path";
import fs from "fs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    // Resolve the lib package using the node_modules symlink that pnpm creates
    const nodeModulesLibPath = path.resolve(__dirname, "../node_modules/@panta/lib");
    let libSrcPath: string;
    
    if (fs.existsSync(nodeModulesLibPath)) {
      // Follow the symlink to get the real path
      const realLibPath = fs.realpathSync(nodeModulesLibPath);
      libSrcPath = path.resolve(realLibPath, "src");
    } else {
      // Fallback to relative path if symlink doesn't exist
      libSrcPath = path.resolve(__dirname, "../../lib/src");
    }
    
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@panta/lib": libSrcPath,
          "next/navigation": path.resolve(__dirname, "./next-navigation-mock.ts"),
          "next/link": path.resolve(__dirname, "./next-link-mock.tsx"),
          "next/image": path.resolve(__dirname, "./next-image-mock.tsx"),
        },
      },
    });
  },
};
export default config;
