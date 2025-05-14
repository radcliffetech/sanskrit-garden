import type { Difficulty } from "~/types";
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
      <div
        className="flex justify-center gap-0"
        role="radiogroup"
        aria-label="Select quiz difficulty"
      >
        {["Easy", "Medium", "Hard"].map((level) => {
          const value = level.toLowerCase() as Difficulty;
          const isSelected = selected === value;
          return (
            <label
              key={value}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              className={`mx-2 pill-lg ${
                isSelected ? "pill-active" : "pill-inactive"
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
