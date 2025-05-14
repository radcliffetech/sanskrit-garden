import { render, screen } from "@testing-library/react";

import StorytellerContainer from "./StoryContainer";

jest.mock("~/hooks/useStoryteller", () => ({
  useStoryteller: () => ({
    segments: [],
    questions: [],
    selectedTopic: "wisdom",
    loading: false,
    error: null,
    isStoryStarted: false,
    isStoryOver: false,
    selectedContinuation: null,
    setSelectedTopic: jest.fn(),
    setIsStoryOver: jest.fn(),
    handleStartStory: jest.fn(),
    handleContinue: jest.fn(),
    handleRestart: jest.fn(),
    handleDownload: jest.fn(),
  }),
  getDefaultTopics: () => ["truth", "wisdom", "compassion"],
}));

describe("StorytellerContainer", () => {
  it("renders welcome screen with story topic form", () => {
    render(<StorytellerContainer />);
    expect(screen.getByText(/welcome, traveler/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
  });
});
