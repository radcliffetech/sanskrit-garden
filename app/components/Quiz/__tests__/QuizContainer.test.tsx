import * as remix from "@remix-run/react";

import { fireEvent, render, screen } from "@testing-library/react";

import { QuizContainer } from "../QuizContainer";

jest.mock("@remix-run/react", () => ({
  useLoaderData: jest.fn(),
}));

const mockQuestions = [
  {
    id: "1",
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    answer: "4",
    difficulty: "easy",
  },
  {
    id: "2",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris"],
    answer: "Paris",
    difficulty: "easy",
  },
  {
    id: "3",
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
    difficulty: "easy",
  }
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


  it("starts quiz when difficulty is selected and Start is clicked", () => {
    render(<QuizContainer />);

    const easyOption = screen.getByLabelText("Easy");
    fireEvent.click(easyOption);

    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).not.toBeDisabled();

    fireEvent.click(startButton);

    // Should render the question now
    expect(screen.getByText("What is 2 + 2?")).toBeInTheDocument();
  });
});


  it("submits answer and shows result screen", () => {
    render(<QuizContainer />);

    // Start the quiz
    const easyOption = screen.getByLabelText("Easy");
    fireEvent.click(easyOption);
    const startButton = screen.getByRole("button", { name: /start/i });
    fireEvent.click(startButton);

    // Select the correct answer
    const answerOption = screen.getByRole("radio", { name: "4" });
    fireEvent.click(answerOption);

    // Go to the next question
    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    // Select the correct answer for the second question
    const answerOption2 = screen.getByRole("radio", { name: "Paris" });
    fireEvent.click(answerOption2);

    // Go to the next question
    fireEvent.click(nextButton);

    // Select the wrong answer for the third question
    const answerOption3 = screen.getByRole("radio", { name: "Earth" });
    fireEvent.click(answerOption3);
    
    // Go to the next question
    fireEvent.click(nextButton);

    // Submit the quiz
    const submitButton = screen.getByRole("button", { name: /complete quiz/i });
    fireEvent.click(submitButton);

    // Check for result
    expect(screen.getByText(/you scored 2 out of 3/i)).toBeInTheDocument();
  });
