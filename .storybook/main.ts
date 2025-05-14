import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = {
      alias: {
        "~": path.resolve(__dirname, "../app"),
      },
    };
    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      exclude: ["@remix-run/react", "@remix-run/router"],
    };
    config.plugins = [tsconfigPaths(), ...(config.plugins || [])];
    return config;
  },
};

export default config;
