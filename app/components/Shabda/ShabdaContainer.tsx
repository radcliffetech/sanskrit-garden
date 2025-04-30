import { DeclensionGrid } from "../Verbs/DeclensionGrid";
import { FadeIn } from "../Shared";
import { SelectShabdaForm } from "./SelectShabdaForm";
import type { Shabda } from "~/types";
import { ShabdaInfo } from "./ShabdaInfo";
import { useState } from "react";

export function ShabdaContainer({ shabdas }: { shabdas: Shabda[] }) {
  if (shabdas.length === 0) {
    return (
      <div className="text-center text-gray-700">
        No shabdas available. Please check your data source.
      </div>
    );
  }
  const [shabda, setShabda] = useState<Shabda | null>(shabdas[0]);

  const handleSelect = (selectedShabda: Shabda) => {
    setShabda(selectedShabda);
  };

  return (
    <>
      <p className="text-gray-700 text-lg leading-relaxed">
      In Sanskrit, nouns (saṃjñā) are words that name people, places, objects, or abstract ideas, and are fully declined based on case, number, and gender. They follow specific stem-based patterns such as a-stem or ā-stem, which determine their grammatical forms.
      </p>
      <div className="py-6">
        <SelectShabdaForm
          shabdas={shabdas}
          selectedShabda={shabda}
          onSelect={handleSelect}
        />
      </div>
      {shabda && <ShabdaDetailContainer shabda={shabda} />}
    </>
  );
}

function ShabdaDetailContainer({ shabda }: { shabda: Shabda }) {
  return (
    <FadeIn key={shabda.name}>
      <div className="py-6">
        <ShabdaInfo shabda={shabda} />
      </div>
      <DeclensionGrid shabda={shabda} />
    </FadeIn>
  );
}
