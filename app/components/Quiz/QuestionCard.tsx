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
    <div className="mb-6 p-6 rounded border border-gray-200 bg-gray-50 shadow-sm">
      <p className="text-xl font-light text-gray-800 mb-4">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((opt, idx) => (
          <label
            key={idx}
            className={`block px-4 py-2 border rounded cursor-pointer transition ${
              selectedAnswer === opt
                ? "bg-blue-100 border-blue-400 text-blue-800 font-medium"
                : "bg-white border-gray-300 hover:border-gray-400"
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={opt}
              className="sr-only"
              checked={selectedAnswer === opt}
              onChange={() => onSelect(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
