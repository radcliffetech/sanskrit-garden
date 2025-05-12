console.log("✅ Loaded vite.remix.config.ts");

import { defineConfig } from "vite";
import { flatRoutes } from "remix-flat-routes";
import path from "path";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

const isStorybook = process.env.STORYBOOK === "true";

const remixPlugin =
  !isStorybook &&
  remix({
    future: {
      v3_fetcherPersist: true,
      v3_relativeSplatPath: true,
      v3_throwAbortReason: true,
      v3_singleFetch: true,
      v3_lazyRouteDiscovery: true,
    },
    routes: async (defineRoutes) => {
      return flatRoutes("routes", defineRoutes);
    },
  });

export default defineConfig({
  plugins: [remixPlugin, tsconfigPaths()].filter(Boolean),
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "app"),
    },
  },
});
