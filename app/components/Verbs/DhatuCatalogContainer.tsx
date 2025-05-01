import type { DhatuCatalogEntry } from "~/types";
import dhatuIndex from "~/data/verbs/dhatu-index.json";
import { useState } from "react";

export function DhatuCatalogContainer({
    entries
}: {
    entries: DhatuCatalogEntry[];


}) {
  const [selected, setSelected] = useState<DhatuCatalogEntry | null>(null);

  return (
    <div className="space-y-6">

      <p className="text-sm text-gray-600">
        Total dhātus: {entries.length.toLocaleString("en-IN")} entries
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {entries.map((dhatu) => (
          <div
            key={dhatu.root}
            onClick={() => setSelected(dhatu)}
            className="p-4 rounded border bg-white shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="text-xl font-semibold text-purple-700">{dhatu.root}</div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 space-y-2">
            <div className="text-xl font-bold text-purple-700">{selected.root}</div>
            <div className="text-sm text-gray-500 italic">{selected.transliteration}</div>
            <div className="text-sm text-gray-600">{selected.meaning}</div>
            <div className="text-xs text-gray-400">
              Class {selected.class} • Voice: {selected.voice} • {selected.transitivity}
            </div>
            <button
              className="mt-3 text-sm text-blue-600 underline"
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}