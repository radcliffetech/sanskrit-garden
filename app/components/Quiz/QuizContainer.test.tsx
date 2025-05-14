import { Difficulty, QuizQuestion } from "~/types";
import { fireEvent, render, screen } from "@testing-library/react";

import { QuizContainer } from "./QuizContainer";

const mockQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "What is 2 + 2?",
    options: ["3", "4", "5"],
    answer: "4",
    difficulty: "easy" as Difficulty,
  },
  {
    id: "2",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris"],
    answer: "Paris",
    difficulty: "easy" as Difficulty,
  },
  {
    id: "3",
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
    difficulty: "easy" as Difficulty,
  },
];

describe("QuizContainer", () => {
  it("renders start screen with difficulty options", () => {
    render(<QuizContainer questions={mockQuestions} />);
    expect(screen.getByText(/select a difficulty level/i)).toBeInTheDocument();
    expect(screen.getByText("Easy")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Hard")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start/i })).toBeDisabled();
  });

  it("starts quiz when difficulty is selected and Start is clicked", () => {
    render(<QuizContainer questions={mockQuestions} />);

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
  render(<QuizContainer questions={mockQuestions} />);

  // Start the quiz
  const easyOption = screen.getByLabelText("Easy");
  fireEvent.click(easyOption);
  const startButton = screen.getByRole("button", { name: /start/i });
  fireEvent.click(startButton);

  // Select the correct answer
  const answerOption = screen.getAllByRole("radio", { name: "4" })[0];
  fireEvent.click(answerOption);

  // Go to the next question
  const nextButton = screen.getByRole("button", { name: /next/i });
  fireEvent.click(nextButton);

  // Select the correct answer for the second question
  const answerOption2 = screen.getAllByRole("radio", { name: "Paris" })[0];
  fireEvent.click(answerOption2);

  // Go to the next question
  fireEvent.click(nextButton);

  // Select the wrong answer for the third question
  const answerOption3 = screen.getAllByRole("radio", { name: "Earth" })[0];
  fireEvent.click(answerOption3);

  // Go to the next question
  fireEvent.click(nextButton);

  // Submit the quiz
  const submitButton = screen.getByRole("button", { name: /complete quiz/i });
  fireEvent.click(submitButton);

  // Check for result
  expect(
    screen.getByText(
      (content) =>
        content.includes("2") && content.includes("/") && content.includes("3")
    )
  ).toBeInTheDocument();
});
