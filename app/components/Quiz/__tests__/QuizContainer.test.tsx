import * as remix from "@remix-run/react";

import { fireEvent, render, screen } from "@testing-library/react";

import { QuizContainer } from "../QuizContainer";

jest.mock("@remix-run/react", () => ({
  useLoaderData: jest.fn(),
}));

const mockQuestions = [
  {
    id: "1",
    question: "What is the Sanskrit word for 'sun'?",
    options: ["सूर्यः", "चन्द्रः", "अग्निः"],
    answer: "सूर्यः",
    difficulty: "easy",
  },
];

describe("QuizContainer", () => {
  beforeEach(() => {
    (remix.useLoaderData as jest.Mock).mockReturnValue(mockQuestions);
  });

  it("renders start screen with difficulty options", () => {
    render(<QuizContainer />);
    expect(screen.getByText(/select a difficulty level/i)).toBeInTheDocument();
    expect(screen.getByText("Easy")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Hard")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start/i })).toBeDisabled();
  });

  // More tests to come: selecting difficulty, submitting quiz, resetting...
});