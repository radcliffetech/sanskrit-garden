import type { QuizQuestion } from "~/types";
export function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}: {
  question: QuizQuestion;
  selectedAnswer: string | undefined;
  onSelect: (questionId: string, value: string) => void;
}) {
  console.log("Rendering QuestionCard", {
    question: question,
    selectedAnswer: selectedAnswer,
  });
  return (
    <div className="mb-10">
      <p className="text-xl font-light text-gray-800 mb-4">
        {question.question}
      </p>
      <div
        className="space-y-2"
        role="radiogroup"
        aria-label={`Options for ${question.question}`}
      >
        {question.options.map((opt, idx) => {
          const isSelected = selectedAnswer === opt;
          return (
            <label
              key={idx}
              className={`quiz-option ${
                isSelected ? "quiz-option-selected" : "quiz-option-unselected"
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={String(opt)}
                className="sr-only"
                checked={isSelected}
                onChange={(e) => {
                  console.log(
                    "Selected option:",
                    e.target.value,
                    "for question:",
                    question.id
                  );
                  onSelect(question.id, e.target.value);
                }}
              />
              {opt}
            </label>
          );
        })}
      </div>
    </div>
  );
}
