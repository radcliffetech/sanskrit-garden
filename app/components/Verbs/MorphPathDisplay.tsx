import type { DhatuTree } from "~/types";

type MorphDerivation = DhatuTree["forms"][number]["derivations"][number];

export function MorphPathDisplay({ derivation }: { derivation: MorphDerivation }) {
  return (
    <div className="space-y-2 mb-4">
      <div className="text-2xl font-bold text-gray-900">{derivation.form}</div>
      <div className="text-gray-500 italic text-sm">{derivation.transliteration}</div>
      {derivation.meaning && (
        <div className="text-sm text-gray-600">{derivation.meaning}</div>
      )}
      <div className="flex flex-wrap items-center gap-1 mt-2 text-lg">
        {derivation.path.map((part, i) => (
          <span key={i} className="bg-gray-100 rounded px-2 py-1 text-gray-800">
            {part}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
        {derivation.pathIAST.map((part, i) => (
          <span key={i} className="bg-gray-50 rounded px-2 py-0.5">
            {part}
          </span>
        ))}
      </div>
    </div>
  );
}