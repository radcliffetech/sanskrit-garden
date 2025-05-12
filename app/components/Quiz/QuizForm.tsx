import { ConfirmModal } from "~/components/Shared/ConfirmModal";
import { LoaderFunction } from "@remix-run/node";
import { QuestionCard } from "~/components/Quiz/QuestionCard";
import { QuizNavigation } from "~/components/Quiz/QuizNavigation";
import type { QuizQuestion } from "~/types";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { getQuizQuestions } from "~/lib/loader/quiz";
import { useState } from "react";

export const loader: LoaderFunction = ({ request }) => {
    return getQuizQuestions();
  };

  
export function QuizForm({
  questions,
  answers,
  onChange,
  onSubmit,
  onExit,
}: {
  questions: QuizQuestion[];
  answers: Record<string, string>;
  onChange: (questionId: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onExit: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmingExit, setConfirmingExit] = useState(false);
  const currentQuestion = questions[currentIndex];

  return (
    <>
    <form onSubmit={onSubmit}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <button
          type="button"
          onClick={() => setConfirmingExit(true)}
          className=""
          aria-label="Exit Quiz"
        >
          <XMarkIcon className="h-7 w-7 text-gray-500 hover:text-gray-700" />
        </button>
      </div>
      {currentQuestion && (
        <QuestionCard
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion.id]}
            onSelect={(value) => onChange(currentQuestion.id, value)}
        />
      )}
      <QuizNavigation
        currentIndex={currentIndex}
        total={questions.length}
        onPrevious={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
        onNext={() => { 
            setCurrentIndex((prev) => Math.min(prev + 1, questions.length))}
        }
        onSubmit={(e) => {
          // Prevent double submit if using both onSubmit handler and button onClick
          if (typeof e === "object" && "preventDefault" in e) e.preventDefault();
          onSubmit(e);
          return false; // Prevent default form submission
        }}
      />
    </form>
    <ConfirmModal
      isOpen={confirmingExit}
      title="Exit Quiz?"
      message="Are you sure you want to exit the quiz? Your answers will not be saved."
      onCancel={() => setConfirmingExit(false)}
      onConfirm={() => {
        setConfirmingExit(false);
        onExit();
      }}
    />
    </>
  );
}