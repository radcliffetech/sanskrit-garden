import type { DhatuTree } from "~/types";
import { DhatuTreeDisplay } from "./DhatuTreeDisplay";

export function DhatuTreesContainer({ trees }: { trees: DhatuTree[] }) {
  return (
    <div className="space-y-12">
      {trees.map((tree) => (
        <div key={tree.root} className="border-b pb-8">
          <DhatuTreeDisplay dhatu={tree} />
        </div>
      ))}
    </div>
  );
}