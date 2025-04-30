import type { Shabda } from "~/types";

export function SelectShabdaForm({
  shabdas,
  selectedShabda,
  onSelect,
}: {
  shabdas: Shabda[];
  selectedShabda: Shabda | null;
  onSelect: (shabda: Shabda) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3 justify-center p-6">
      {shabdas.map((shabda) => (
        <button
          key={shabda.name}
          onClick={() => onSelect(shabda)}
          className={`pill-lg text-2xl px-6 py-4 ${selectedShabda?.name === shabda.name ? "highlight-1" : "pill-inactive"}`}
        >
          {shabda.name}
        </button>
      ))}
    </div>
  );
}
