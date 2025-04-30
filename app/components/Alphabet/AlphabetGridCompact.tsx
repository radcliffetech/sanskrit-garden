import { AlphabetCard } from "./AlphabetCard";
import { AlphabetItem } from "~/types";

export function AlphabetGridCompact({
  data,
  highlightLevel1,
  highlightLevel2,
}: {
  data: AlphabetItem[] | undefined;
  highlightLevel1?: Set<string>;
  highlightLevel2?: Set<string>;
}) {
  if (!data) return null;
  console.log("AlphabetGrid", data.length, highlightLevel1, highlightLevel2);

  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14 gap-2">
      {data.map((item, index) => {
        const inLevel2 = highlightLevel2?.has(item.char);
        const inLevel1 = highlightLevel1?.has(item.char) || inLevel2;

        let highlightLevel: 0 | 1 | 2 = 0;
        if (inLevel2) {
          highlightLevel = 2;
        } else if (inLevel1) {
          highlightLevel = 1;
        }

        return (
          <AlphabetCard
            key={index}
            item={item}
            highlightLevel={highlightLevel}
            mode="compact"
          />
        );
      })}
    </div>
  );
}
