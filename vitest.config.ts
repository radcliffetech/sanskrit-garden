import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: "sanskrit-garden",
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setupTests.ts"],
    include: ["app/**/*.test.{ts,tsx}"],
  },
});
