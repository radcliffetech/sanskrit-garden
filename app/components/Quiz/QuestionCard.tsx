import type { QuizQuestion } from "~/types";

export function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}: {
  question: QuizQuestion;
  selectedAnswer: string | undefined;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="mb-10">
      <p className="text-xl font-light text-gray-800 mb-4">{question.question}</p>
      <div className="space-y-2" role="radiogroup" aria-label={`Options for ${question.question}`}>
        {question.options.map((opt, idx) => {
          const isSelected = selectedAnswer === opt;
          return (
            <label
              key={idx}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(opt);
                }
              }}
              className={`block px-4 py-2 border rounded cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                isSelected
                  ? "bg-gray-900 text-white border-gray-900 font-medium"
                  : "bg-white border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={opt}
                className="sr-only"
                checked={isSelected}
                onChange={() => onSelect(opt)}
              />
              {opt}
            </label>
          );
        })}
      </div>
    </div>
  );
}
