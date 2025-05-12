import type { Difficulty } from "~/types";
import { LoaderFunction } from "@remix-run/node";
import { getQuizQuestions } from "~/lib/loader/quiz";
import { useState } from "react";

export function QuizStart({
  onSelect,
}: {
  onSelect: (difficulty: Difficulty) => void;
}) {
  const [selected, setSelected] = useState<Difficulty | null>(null);

  const handleStart = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="space-y-6 text-center">
      <p className="text-gray-600">
        Test your Sanskrit knowledge that you have gained from perusing the
        website. Select a difficulty level.
      </p>
      <div className="flex justify-center gap-0" role="radiogroup" aria-label="Select quiz difficulty">
        {["Easy", "Medium", "Hard"].map((level) => {
          const value = level.toLowerCase() as Difficulty;
          const isSelected = selected === value;
          return (
            <label
              key={value}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              className={`cursor-pointer rounded px-5 py-3 border text-base font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                isSelected
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelected(value);
                }
              }}
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
          className="btn-primary mt-4 disabled:opacity-50"
        >
          Start
        </button>
      </div>
    </div>
  );
}
