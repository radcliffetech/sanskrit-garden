import { AlphabetCardSmall } from "./AlphabetCardSmall";
import { AlphabetItem } from "~/types";
import layout from "~/data/alphabet/alphabet-layout.json";

export function AlphabetLayout({
  data,
  highlightLevel1,
  highlightLevel2,
}: {
  data: AlphabetItem[] | undefined;
  highlightLevel1?: Set<string>;
  highlightLevel2?: Set<string>;
}) {
  if (!data) return null;

  return (
    <div className="space-y-2">
      {layout.map((row: string[], rowIndex: number) => (
        <div key={rowIndex} className="flex justify-start gap-2">
          {row.map((char) => {
            const item = data.find((i) => i.char === char);
            if (!item) return null;

            const inLevel2 = highlightLevel2?.has(item.char);
            const inLevel1 = highlightLevel1?.has(item.char) || inLevel2;

            let highlightLevel: 0 | 1 | 2 = 0;
            if (inLevel2) {
              highlightLevel = 2;
            } else if (inLevel1) {
              highlightLevel = 1;
            }

            return (
              <AlphabetCardSmall
                key={item.char}
                item={item}
                highlightLevel={highlightLevel}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
