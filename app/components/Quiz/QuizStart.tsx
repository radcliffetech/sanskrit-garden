import type { Difficulty } from "~/types";
import { LoaderFunction } from "@remix-run/node";
import { getQuizQuestions } from "~/loader/quiz";
import { useState } from "react";

export const loader: LoaderFunction = ({ request }) => {
    return getQuizQuestions();
  };




export function QuizStart({ onSelect }: { onSelect: (difficulty: Difficulty) => void }) {
  const [selected, setSelected] = useState<Difficulty | null>(null);

  const handleStart = () => {
    if (selected) {
      onSelect(selected);
    }
  };

  return (
    <div className="space-y-8 text-center">
      <div className="space-y-2">
        <p className="text-gray-600">Test your Sanskrit knowledge that you have gained from perusing the website. Select a difficulty level.</p>
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