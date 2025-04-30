import React from "react";

interface Props {
  value: "vowels" | "consonants";
  onChange: (val: "vowels" | "consonants") => void;
}

export function SubgroupCategorySelect({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex gap-2">
        {(["vowels", "consonants"] as const).map((group) => (
          <button
            key={group}
            onClick={() => onChange(group)}
            className={`pill-lg border text-sm font-semibold transition ${
              value === group
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {group.charAt(0).toUpperCase() + group.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}