import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

import type { QuizQuestion } from "~/types";

export function QuizResult({
  score,
  total,
  onReset,
  questions,
  answers,
}: {
  score: number;
  total: number;
  onReset: () => void;
  questions: QuizQuestion[];
  answers: Record<string, string>;
}) {
  return (
    <div>
      <div className="text-center mb-6">
        <p className="text-2xl text-gray-700 font-medium mb-10">
          Total Score &mdash; {score}/{total}
        </p>
      </div>
      <div className="space-y-3">
        {questions.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.answer;
          return (
            <div key={q.id} className="p-4 border rounded-md bg-gray-50">
              <p className="font-light mb-2">{q.question}</p>
              {q.options.map((opt) => {
                const selectedStyle =
                  opt === selected
                    ? isCorrect
                      ? "quiz-answer quiz-answer-correct"
                      : "quiz-answer quiz-answer-incorrect"
                    : "quiz-answer quiz-answer-neutral";
                return (
                  <div key={opt} className={selectedStyle}>
                    {opt === selected && (
                      <>
                        {isCorrect ? (
                          <CheckCircleIcon className="inline-block h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <XCircleIcon className="inline-block h-4 w-4 text-red-500 mr-1" />
                        )}
                      </>
                    )}
                    {opt}
                    {opt === q.answer && opt !== selected && (
                      <span className="ml-2 text-green-600">(Correct)</span>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <button type="button" onClick={onReset} className="btn-primary">
          Try Again
        </button>
      </div>
    </div>
  );
}
