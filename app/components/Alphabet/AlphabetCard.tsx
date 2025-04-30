import { AlphabetItem } from "~/types";

export function AlphabetCard({ item, isActive = true }: { item: AlphabetItem; isActive?: boolean }) {
  return (
    <div className={`p-4 border rounded bg-white shadow transition ${!isActive ? "opacity-30 grayscale" : "hover:shadow-md"}`}>
      <div className="text-3xl font-semibold mb-1">{item.char}</div>
      <div className="text-base text-gray-700 italic">{item.latin}</div>
      <div className="text-sm text-gray-500">{item.pronunciation}</div>
    </div>
  );
}
