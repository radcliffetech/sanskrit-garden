import { LoaderFunction } from "@remix-run/node";
import type { QuizQuestion } from "~/types";
import { getQuizQuestions } from "~/loader/quiz";

export const loader: LoaderFunction = ({ request }) => {
  return getQuizQuestions();
};

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
        <p className="text-xl font-medium">
          You scored {score} out of {total}.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
      <div className="space-y-6">
        {questions.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.answer;
          return (
            <div key={q.id} className="p-4 border rounded">
              <p className="font-light mb-2">{q.question}</p>
              {q.options.map((opt) => {
                const selectedStyle =
                  opt === selected
                    ? isCorrect
                      ? "text-green-600 font-light"
                      : "text-red-600 font-light"
                    : "text-gray-800";
                return (
                  <div key={opt} className={selectedStyle}>
                    {opt === selected && (
                      <span className="mr-2">{isCorrect ? "✅" : "❌"}</span>
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
    </div>
  );
}
