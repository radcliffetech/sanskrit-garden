import { AlphabetCard } from "./AlphabetCard";
import { AlphabetItem } from "~/types";

export function AlphabetGrid({ data }: { data: AlphabetItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {data.map((item, index) => (
        <AlphabetCard key={index} item={item} />
      ))}
    </div>
  );
}