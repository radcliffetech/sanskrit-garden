import type { Shabda } from "~/types";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

const caseMetadata = {
  nominative: { label: "Nominative", description: "Subject of the sentence" },
  accusative: { label: "Accusative", description: "Direct object of the verb" },
  instrumental: { label: "Instrumental", description: "Means or instrument" },
  dative: { label: "Dative", description: "Recipient or beneficiary" },
  ablative: { label: "Ablative", description: "Point of separation or origin" },
  genitive: { label: "Genitive", description: "Possession or relation" },
  locative: { label: "Locative", description: "Location or place" },
  vocative: { label: "Vocative", description: "Address or calling out" },
};

const numberDescriptions = {
  Singular: "Refers to one object",
  Dual: "Refers to two objects",
  Plural: "Refers to more than two objects",
};

export function DeclensionGrid({ shabda }: { shabda: Shabda }) {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

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

  const numbers: (keyof typeof numberDescriptions)[] = ["Singular", "Dual", "Plural"];

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full text-center text-xl">
        <thead>
          <tr>
            <th className="border px-4 py-2 font-semibold text-left">Case</th>
            {numbers.map((num, i) => (
              <th
                key={num}
                className={`border px-4 py-2 transition duration-150 ${hoveredCol === i ? "highlight-1" : ""}`}
                data-tooltip-id="declension-tooltip"
                data-tooltip-content={numberDescriptions[num]}
                onMouseEnter={() => setHoveredCol(i)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                {num}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map(([label, key]) => (
            <tr key={key}>
              <td
                className={`border px-4 py-2 text-left font-medium transition duration-150 ${
                  hoveredRow === key ? "highlight-1" : ""
                }`}
                data-tooltip-id="declension-tooltip"
                data-tooltip-content={caseMetadata[key].description}
                onMouseEnter={() => setHoveredRow(key)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {caseMetadata[key].label}
              </td>
              {declension[key].map((form, i) => (
                <td
                  key={i}
                  className={`border px-4 py-2 transition duration-150 ${
                    hoveredRow === key && hoveredCol === i
                      ? "highlight-2 ring-2 ring-indigo-300"
                      : hoveredRow === key || hoveredCol === i
                      ? "highlight-1"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    setHoveredRow(key);
                    setHoveredCol(i);
                  }}
                  onMouseLeave={() => {
                    setHoveredRow(null);
                    setHoveredCol(null);
                  }}
                >
                  {form || "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Tooltip id="declension-tooltip" place="top" />
    </div>
  );
}
