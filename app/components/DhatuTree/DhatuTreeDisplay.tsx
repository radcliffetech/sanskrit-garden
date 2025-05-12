import type { DhatuTree } from "~/types";
import { FadeIn } from "~/ui/core/FadeIn";
import { MorphPathDisplay } from "../Verbs/MorphPathDisplay";
import { useState } from "react";

export function DhatuTreeDisplay({ dhatu }: { dhatu: DhatuTree }) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-gray-800">{dhatu.root}</div>
      <div className="text-lg text-gray-600 italic">
        ({dhatu.meaning}) • Class {dhatu.class}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {dhatu.forms.map((form) => (
          <button
            key={form.label}
            onClick={() =>
              setActiveLabel(activeLabel === form.label ? null : form.label)
            }
            className={`pill-lg ${
              activeLabel === form.label ? "highlight-1" : "pill-inactive"
            }`}
          >
            {form.label}
          </button>
        ))}
      </div>

      {dhatu.forms
        .filter((form) => form.label === activeLabel)
        .map((form) => (
          <div
            key={form.label}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {form.derivations.map((d) => (
              <FadeIn key={d.form}>
                <MorphPathDisplay key={d.form} derivation={d} />
              </FadeIn>
            ))}
          </div>
        ))}
    </div>
  );
}
