const React = require("react");

function MockMarkdown({ children }) {
  return React.createElement("div", { "data-testid": "mock-markdown" }, children);
}

module.exports = MockMarkdown;