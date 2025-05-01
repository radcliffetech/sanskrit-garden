import type { DhatuTree } from "~/types";

export function DhatuTreeDisplay({ dhatu }: { dhatu: DhatuTree }) {
  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-gray-800">{dhatu.root}</div>
      <div className="text-lg text-gray-600 italic">({dhatu.meaning}) • Class {dhatu.class}</div>

      {dhatu.forms.map((section) => (
        <div key={section.label}>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{section.label}</h3>
          <div className="flex flex-wrap gap-3">
            {section.items.map((item) => (
              <span
                key={item}
                className="pill-lg pill-inactive text-lg"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}