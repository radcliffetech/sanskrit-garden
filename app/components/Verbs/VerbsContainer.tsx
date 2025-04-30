import { FadeIn } from "../Shared";
import { SelectVerbForm } from "./SelectVerbForm";
import { VerbConjugationGrid } from "./VerbConjugationGrid";
import type { VerbShabda } from "~/types";
import { useState } from "react";

export function VerbsContainer({ verbs }: { verbs: VerbShabda[] }) {
  const [verb, setVerb] = useState<VerbShabda>(verbs[0]);

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-lg leading-relaxed">
        Sanskrit verbs conjugate according to tense, number, person, and voice.
        Use the grid below to explore how root verbs like <em>गम्</em> evolve
        into full conjugated forms like <em>गच्छामि</em>.
      </p>
      <div className="py-6">
        <SelectVerbForm
          shabdas={verbs}
          selectedShabda={verb}
          onSelect={setVerb}
        />
      </div>
      <FadeIn key={verb.baseForm}>
        <div className="py-6">
          <VerbConjugationGrid verb={verb} />
        </div>
      </FadeIn>
    </div>
  );
}
