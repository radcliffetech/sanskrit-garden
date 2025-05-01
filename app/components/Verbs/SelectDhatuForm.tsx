import type { DhatuTree } from "~/types";

export function SelectDhatuForm({
  dhatus,
  selectedDhatu,
  onSelect,
}: {
  dhatus: DhatuTree[];
  selectedDhatu: DhatuTree | null;
  onSelect: (dhatu: DhatuTree) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      {dhatus.map((dhatu) => (
        <button
          key={dhatu.root}
          onClick={() => onSelect(dhatu)}
          className={`pill-lg text-2xl px-6 py-4 ${
            selectedDhatu?.root === dhatu.root ? "highlight-1" : "pill-inactive"
          }`}
        >
          {dhatu.root}
        </button>
      ))}
    </div>
  );
}
