import { AlphabetItem } from "~/types";

export function AlphabetCard({ item }: { item: AlphabetItem }) {
  return (
    <div className="p-4 border rounded bg-white shadow hover:shadow-md transition">
      <div className="text-3xl font-semibold mb-1">{item.char}</div>
      <div className="text-base text-gray-700 italic">{item.latin}</div>
      <div className="text-sm text-gray-500">{item.pronunciation}</div>
    </div>
  );
}
