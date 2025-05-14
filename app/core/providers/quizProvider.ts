import type { Difficulty, QuizQuestion } from "~/types";

export function createQuizManager(allQuestions: QuizQuestion[]) {
  let quizQuestions: QuizQuestion[] = [];
  let answers: Record<string, string> = {};
  let score: number | null = null;

  return {
    start(difficulty: Difficulty) {
      quizQuestions = allQuestions.filter((q) => q.difficulty === difficulty);
      answers = {};
      score = null;
    },
    getQuestions(): QuizQuestion[] {
      return quizQuestions;
    },
    answer(questionId: string, value: string) {
      answers[questionId] = value;
    },
    getAnswers(): Record<string, string> {
      return answers;
    },
    computeScore(): number {
      score = quizQuestions.reduce((acc, q) => {
        const userAnswer = answers[q.id]?.trim();
        return acc + (userAnswer === q.answer.trim() ? 1 : 0);
      }, 0);
      return score;
    },
    getScore(): number | null {
      return score;
    },
    reset() {
      quizQuestions = [];
      answers = {};
      score = null;
    },
  };
}
