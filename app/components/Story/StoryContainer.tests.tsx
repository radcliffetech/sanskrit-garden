import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import StorytellerContainer from "./StoryContainer";

vi.mock("~/hooks/useStoryteller", () => ({
  useStoryteller: () => ({
    segments: [],
    questions: [],
    selectedTopic: "wisdom",
    loading: false,
    error: null,
    isStoryStarted: false,
    isStoryOver: false,
    selectedContinuation: null,
    setSelectedTopic: vi.fn(),
    setIsStoryOver: vi.fn(),
    handleStartStory: vi.fn(),
    handleContinue: vi.fn(),
    handleRestart: vi.fn(),
    handleDownload: vi.fn(),
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
