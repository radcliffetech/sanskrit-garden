import { AlphabetCard } from "./AlphabetCard";
import { AlphabetItem } from "~/types";

export function AlphabetGrid({ data, activeChars }: { data: AlphabetItem[] | undefined; activeChars?: Set<string> }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {data.map((item, index) => (
        <AlphabetCard key={index} item={item} isActive={activeChars ? activeChars.has(item.char) : true} />
      ))}
    </div>
  );
}