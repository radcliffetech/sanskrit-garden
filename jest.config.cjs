module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-markdown|rehype-raw|remark-breaks)/)",
  ],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
    "react-markdown":
      "<rootDir>/app/core/test-utils/__mocks__/react-markdown.js",
    "rehype-raw": "<rootDir>/app/core/test-utils/__mocks__/rehype-raw.js",
    "remark-breaks": "<rootDir>/app/core/test-utils/__mocks__/remark-breaks.js",
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
