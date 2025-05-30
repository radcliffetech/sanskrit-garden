import type { DhatuTree } from "~/types";

type MorphDerivation = DhatuTree["forms"][number]["derivations"][number];

export function MorphPathDisplay({ derivation }: { derivation: MorphDerivation }) {
  return (
    <div className="space-y-2 mb-4">
      <div className="text-2xl font-bold text-gray-900">{derivation.form}</div>
      <div className="text-gray-500 italic text-sm">{derivation.transliteration}</div>
      {derivation.meanings && derivation.meanings.length > 0 && (
        <div className="text-sm text-gray-600">
          {derivation.meanings.join(", ")}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-1 mt-2 text-lg">
        {derivation.path.map((part, i) => (
          <span key={i} className="flex items-center">
            {i > 0 && <span className="mx-1 text-gray-400">+</span>}
            <span className="bg-gray-100 rounded px-2 py-1 text-gray-800">{part}</span>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {derivation.pathIAST.map((part, i) => (
          <span key={i} className="flex items-center">
            {i > 0 && <span className="mx-1 text-gray-400">+</span>}
            <span className="bg-gray-50 rounded px-2 py-0.5">{part}</span>
          </span>
        ))}
      </div>
    </div>
  );
}