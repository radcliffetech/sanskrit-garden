import type { MetaFunction } from "@remix-run/node";
import { getAlphabetRepository } from "~/lib/repositories/alphabetRepository";

export const meta: MetaFunction = () => {
  return [
    { title: "Alphabet" },
    { name: "description", content: "Alphabet!" },
  ];
};



export default function Alphabet() {
  const repo = getAlphabetRepository();
  const data = repo.getAlphabet();
  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Alphabet</h1>
      <div className="grid grid-cols-8 gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 border rounded bg-white shadow">
            <div className="text-2xl font-semibold mb-2">{item.char}</div>
            <div className="text-gray-700 italic">{item.latin}</div>
            <div className="text-sm text-gray-600">{item.pronunciation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
