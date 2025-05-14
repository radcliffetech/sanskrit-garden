import type { Difficulty, QuizQuestion } from "~/types";
import { useRef, useState } from "react";

import { QuizForm } from "./QuizForm";
import { QuizResult } from "./QuizResult";
import { QuizStart } from "./QuizStart";
import { createQuizManager } from "~/core/providers/quizProvider";
import { useEffect } from "react";

interface QuizContainerProps {
  questions: QuizQuestion[];
}

export function QuizContainer({ questions }: QuizContainerProps) {
  const quizRef = useRef(createQuizManager(questions));
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const quizQuestions = quizRef.current.getQuestions();
    const result = quizQuestions.reduce((acc, q) => {
      const userAnswer = answers[q.id]?.trim();
      return acc + (userAnswer === q.answer.trim() ? 1 : 0);
    }, 0);
    setScore(result);
  };

  const startQuiz = (difficulty: Difficulty) => {
    quizRef.current.start(difficulty);
    setAnswers({});
    setQuizStarted(true);
  };

  const resetQuiz = () => {
    quizRef.current.reset();
    setQuizStarted(false);
    setScore(null);
    setAnswers({});
  };

  return (
    <>
      <div className="bg-white border border-gray-200 shadow-md rounded-md p-6 space-y-4 w-full max-w-xl min-w-[50rem] mx-auto">
        {!quizStarted ? (
          <QuizStart onSelect={startQuiz} />
        ) : (
          <>
            {score === null ? (
              <QuizForm
                questions={quizRef.current.getQuestions()}
                answers={answers}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onExit={resetQuiz}
              />
            ) : (
              <QuizResult
                score={score}
                total={quizRef.current.getQuestions().length}
                onReset={resetQuiz}
                questions={quizRef.current.getQuestions()}
                answers={answers}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
