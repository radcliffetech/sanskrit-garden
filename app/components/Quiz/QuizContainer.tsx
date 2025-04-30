import type { Difficulty, QuizQuestion } from "~/types";

import { PageFrame } from "~/components/Layout/PageFrame";
import { QuizForm } from "./QuizForm";
import { QuizResult } from "./QuizResult";
import { QuizStart } from "./QuizStart";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";

export function QuizContainer() {
  const questions = useLoaderData<QuizQuestion[]>();
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]); //questions based on difficulty
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correct = 0;
    quizQuestions.forEach((q) => {
      const userAnswer = answers[q.id]?.trim();
      const correctAnswer = q.answer.trim();
      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) {
        correct += 1;
      }
    });
    setScore(correct);
  };

  const startQuiz = (difficulty: Difficulty) => {
    const filtered = questions.filter((q) => q.difficulty === difficulty);
    setQuizQuestions(filtered);
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizQuestions([]);
    setAnswers({});
    setScore(null);
  };

  return (
    <PageFrame>
      <h1 className="text-3xl font-light mb-6">Sanskrit Quiz</h1>
      <div className="bg-white shadow rounded p-6">
        {!quizStarted ? (
          <QuizStart onSelect={startQuiz} />
        ) : (
          <>
            {score === null ? (
              <QuizForm
                questions={quizQuestions}
                answers={answers}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onExit={resetQuiz}
              />
            ) : (
              <QuizResult
                score={score}
                total={quizQuestions.length}
                onReset={resetQuiz}
                questions={quizQuestions}
                answers={answers}
              />
            )}
          </>
        )}
      </div>
    </PageFrame>
  );
}
