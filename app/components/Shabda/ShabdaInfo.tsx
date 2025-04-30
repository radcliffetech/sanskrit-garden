import type { Shabda } from "~/types";

export function ShabdaInfo({ shabda }: { shabda: Shabda }) {
  return (
    <div className="">
      <div className="text-5xl font-bold text-gray-800 mb-2">{shabda.name}</div>
      <div><span className="font-light">{shabda.meaning}</span></div>
      <div className="py-4 space-y-2 text-lg">
        <div>{shabda.gender}, {shabda.declensionClass}</div>

      </div>
    </div>
  );
}
