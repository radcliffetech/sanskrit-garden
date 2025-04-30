import type { VerbShabda } from "~/types";

export function SelectVerbForm({
  shabdas,
  selectedShabda,
  onSelect,
}: {
  shabdas: VerbShabda[];
  selectedShabda: VerbShabda | null;
  onSelect: (shabda: VerbShabda) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {shabdas.map((shabda) => (
        <button
          key={shabda.baseForm}
          onClick={() => onSelect(shabda)}
          className={`pill-lg text-center px-9 py-4 ${
            selectedShabda?.baseForm === shabda.baseForm ? "highlight-1" : "pill-inactive"
          }`}
          data-tooltip-id="verb-select"
          data-tooltip-content={`${shabda.root} • ${shabda.tense} ${shabda.voice}`}
        >
          <div className="text-2xl">{shabda.baseForm}</div>
        </button>
      ))}
    </div>
  );
}
