import { Tooltip } from "react-tooltip";
import type { VerbShabda } from "~/types";
import { useState } from "react";

export function VerbConjugationGrid({ verb }: { verb: VerbShabda }) {
  const persons = [
    ["3rd person", "Third person (he/she/they)"],
    ["2nd person", "Second person (you/you two/you all)"],
    ["1st person", "First person (I/we)"],
  ] as const;

  const numbers: (keyof typeof numberDescriptions)[] = [
    "Singular",
    "Dual",
    "Plural",
  ];
  const numberDescriptions = {
    Singular: "Refers to one subject",
    Dual: "Refers to two subjects",
    Plural: "Refers to more than two subjects",
  };

  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse w-full text-center text-xl">
        <thead>
          <tr>
            <th className="border px-4 py-2 font-semibold text-left">Person</th>
            {numbers.map((num, i) => (
              <th
                key={num}
                className={`border px-4 py-2 transition duration-150 ${
                  hoveredCol === i ? "highlight-1" : ""
                }`}
                data-tooltip-id="verb-tooltip"
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
          {persons.map(([key, description]) => (
            <tr key={key}>
              <td
                className={`border px-4 py-2 text-left font-medium transition duration-150 ${
                  hoveredRow === key ? "highlight-1" : ""
                }`}
                data-tooltip-id="verb-tooltip"
                data-tooltip-content={description}
                onMouseEnter={() => setHoveredRow(key)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {key}
              </td>
              {verb.conjugation[key].map((form, i) => (
                <td
                  key={i}
                  className={`border px-4 py-2 transition duration-150 ${
                    hoveredRow === key && hoveredCol === i
                      ? "highlight-2 font-bold ring-2 ring-indigo-300"
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
      <Tooltip id="verb-tooltip" place="top" />
    </div>
  );
}
