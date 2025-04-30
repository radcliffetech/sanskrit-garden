import type { Shabda } from "~/types";

export function DeclensionGrid({ shabda }: { shabda: Shabda }) {
  const cases = [
    ["Nominative", "nominative"],
    ["Accusative", "accusative"],
    ["Instrumental", "instrumental"],
    ["Dative", "dative"],
    ["Ablative", "ablative"],
    ["Genitive", "genitive"],
    ["Locative", "locative"],
    ["Vocative", "vocative"],
  ] as const;

  const { declension } = shabda;

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full text-center text-xl">
        <thead>
          <tr>
            <th className="border px-4 py-2 font-semibold text-left">Case</th>
            <th className="border px-4 py-2">Singular</th>
            <th className="border px-4 py-2">Dual</th>
            <th className="border px-4 py-2">Plural</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(([label, key]) => (
            <tr key={key}>
              <td className="border px-4 py-2 text-left font-medium">{label}</td>
              {declension[key].map((form, i) => (
                <td key={i} className="border px-4 py-2">
                  {form || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}