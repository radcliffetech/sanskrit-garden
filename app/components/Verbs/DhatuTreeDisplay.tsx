import type { DhatuTree } from "~/types";
import { MorphPathDisplay } from "./MorphPathDisplay";

export function DhatuTreeDisplay({ dhatu }: { dhatu: DhatuTree }) {
  return (
    <div className="space-y-6">
      <div className="text-4xl font-bold text-gray-800">{dhatu.root}</div>
      <div className="text-lg text-gray-600 italic">({dhatu.meaning}) • Class {dhatu.class}</div>

      {dhatu.forms.map((form) => (
  <div key={form.label} className="space-y-3">
    <h3 className="text-xl font-semibold text-gray-700">{form.label}</h3>
    <div className="space-y-4">
      {form.derivations.map((d) => (
        <MorphPathDisplay key={d.form} derivation={d} />
      ))}
    </div>
  </div>
))}
    </div>
  );
}