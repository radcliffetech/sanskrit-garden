import { DeclensionGrid } from "./DeclensionGrid";
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
        In Sanskrit, a <strong>śabda</strong> (word or sound unit) is more than
        a linguistic unit—it is a carrier of meaning, vibration, and
        metaphysical structure. From the roots known as <em>dhātus</em> emerge a
        rich network of nouns, verbs, participles, and more.
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
