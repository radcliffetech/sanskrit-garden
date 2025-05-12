import type { DhatuTree } from "~/types";
import { DhatuTreeDisplay } from "./DhatuTreeDisplay";
import { FadeIn } from "~/ui/core/FadeIn";
import { SelectDhatuForm } from "./SelectDhatuForm";
import { useState } from "react";

export function DhatuTreesContainer({ trees }: { trees: DhatuTree[] }) {
  const [selected, setSelected] = useState<DhatuTree>(trees[0]);

  return (
    <div className="space-y-6">
      <SelectDhatuForm
        dhatus={trees}
        selectedDhatu={selected}
        onSelect={setSelected}
      />
      <FadeIn key={selected.root}>
        <DhatuTreeDisplay dhatu={selected} />
      </FadeIn>
    </div>
  );
}
