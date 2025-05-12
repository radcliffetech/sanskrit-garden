import { render, screen } from "@testing-library/react";

import { Article } from "~/types";
import ArticlesContainer from "./ArticlesContainer";

// Mock Remix Link to avoid ESM import errors in tests
jest.mock("@remix-run/react", () => ({
  Link: ({ to, children }: any) => <a href={to}>{children}</a>,
}));

jest.mock("./ArticlesCard", () => ({
  ArticleCard: ({ article }: { article: Article }) => (
    <div data-testid="mock-article-card">{article.title}</div>
  ),
}));

const mockArticles: Article[] = [
  {
    id: "1",
    title: "Article One",
    author: "Author A",
    summary: "First summary",
    content: "Content 1",
    keywords: ["philosophy", "sanskrit"],
  },
  {
    id: "2",
    title: "Article Two",
    author: "Author B",
    summary: "Second summary",
    content: "Content 2",
    keywords: ["language", "grammar"],
  },
];

describe("ArticlesContainer", () => {
  it("renders AI Explainer link and article cards", () => {
    render(<ArticlesContainer data={mockArticles} />);

    // Article cards check
    const cards = screen.getAllByTestId("mock-article-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Article One");
    expect(cards[1]).toHaveTextContent("Article Two");
  });
});
