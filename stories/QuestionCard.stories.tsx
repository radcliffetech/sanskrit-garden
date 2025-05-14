import type { Meta, StoryObj } from "@storybook/react";

import { Q } from "vitest/dist/chunks/reporters.d.DG9VKi4m.js";
import { QuestionCard } from "~/components/Quiz/QuestionCard";
import type { QuizQuestion } from "~/types";

const meta: Meta<typeof QuestionCard> = {
  title: "Quiz/QuestionCard",
  component: QuestionCard,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof QuestionCard>;

export const Default: Story = {
  args: {
    question: {
      id: "q1",
      question: "What is the Sanskrit word for 'mind'?",
      options: ["manas", "buddhi", "chitta", "ahamkara"],
      answer: "manas",
      difficulty: "easy" as QuizQuestion["difficulty"],
    },
    selectedAnswer: "",
    onSelect: (id: string, value: string) =>
      console.log("Answer selected:", value),
  },
};
