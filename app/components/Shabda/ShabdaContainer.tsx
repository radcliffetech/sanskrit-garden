import { DeclensionGrid } from "./DeclensionGrid";
import type { Shabda } from "~/types";
import { ShabdaInfo } from "./ShabdaInfo";

export function ShabdaContainer({ shabda }: { shabda: Shabda }) {
  return (
    <>
      <p className="text-gray-700 text-lg leading-relaxed">
        In Sanskrit, a <strong>śabda</strong> (word or sound unit) is more than
        a linguistic unit—it is a carrier of meaning, vibration, and
        metaphysical structure. From the roots known as <em>dhātus</em> emerge a
        rich network of nouns, verbs, participles, and more.
      </p>
      <div className="py-6">
        <ShabdaInfo shabda={shabda} />
      </div>
      <DeclensionGrid shabda={shabda} />
    </>
  );
}
