import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { getQuizQuestions, type QuizQuestion, type Difficulty } from "~/lib/repositories/quizRepository";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function QuizNavigation({
  currentIndex,
  total,
  onPrevious,
  onNext,
  onSubmit,
}: {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 flex items-center"
      >
        <ChevronLeftIcon className="h-5 w-5 inline-block mr-1" />
        Previous
      </button>
      {currentIndex  < total ? (
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
        >
          Next
          <ChevronRightIcon className="h-5 w-5 inline-block ml-1" />
        </button>
      ) : (
        <button
          type="submit"
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Complete Quiz
            <ChevronRightIcon className="h-5 w-5 inline-block ml-1" />
        </button>
      )}
    </div>
  );
}
function QuestionCard({
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
      <p className="text-xl font-semibold text-gray-800 mb-4">{question.question}</p>
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


export const loader: LoaderFunction = ({ request }) => {
    return getQuizQuestions();
  };

  
function QuizForm({
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
  const currentQuestion = questions[currentIndex];

  return (
    <form onSubmit={onSubmit}>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-medium">
          Question {currentIndex + 1} of {questions.length}
        </p>
        <button
          type="button"
          onClick={onExit}
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
  );
}

function QuizStart({ onSelect }: { onSelect: (difficulty: Difficulty) => void }) {
  const [selected, setSelected] = useState<Difficulty | null>(null);

  const handleStart = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="space-y-8 text-center">
      <div className="space-y-2">
        <p className="text-gray-600">Test your Sanskrit knowledge. Select a difficulty level.</p>
      </div>
      <div className="flex justify-center gap-6">
        {["Easy", "Medium", "Hard"].map((level) => {
          const value = level.toLowerCase() as Difficulty;
          const isSelected = selected === value;
          return (
            <label
              key={value}
              className={`cursor-pointer rounded-lg px-6 py-4 border text-lg font-medium shadow-sm transition ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="difficulty"
                value={value}
                className="sr-only"
                checked={isSelected}
                onChange={() => setSelected(value)}
              />
              {level}
            </label>
          );
        })}
      </div>
      <div>
        <button
          onClick={handleStart}
          disabled={!selected}
          className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg rounded disabled:opacity-50"
        >
          Start
        </button>
      </div>
    </div>
  );
}

function QuizResult({
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
              <p className="font-semibold mb-2">{q.question}</p>
              {q.options.map((opt) => {
                const selectedStyle =
                  opt === selected
                    ? isCorrect
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                    : "text-gray-800";
                return (
                  <div key={opt} className={selectedStyle}>
                    {opt === selected && (
                      <span className="mr-2">
                        {isCorrect ? "✅" : "❌"}
                      </span>
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

export default function QuizRoute() { 
  const questions = useLoaderData<QuizQuestion[]>(); //all questions
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]); //questions based on difficulty
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
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
  }

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizQuestions([]);
    setAnswers({});
    setScore(null);
    };

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-semibold mb-6">Sanskrit Quiz</h1>
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
    </div>
  );
}