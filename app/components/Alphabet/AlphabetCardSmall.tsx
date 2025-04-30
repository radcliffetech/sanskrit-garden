import { AlphabetItem } from "~/types";

export function AlphabetCardSmall({
  item,
  highlightLevel = 0,
}: {
  item: AlphabetItem;
  highlightLevel?: 0 | 1 | 2;
}) {
  const style = `border rounded shadow transition text-center w-10 h-10 flex items-center justify-center ${
    highlightLevel === 2 ? "highlight-2" : highlightLevel === 1 ? "highlight-1" : ""
  }`;

  return (
    <div className={style}>
      <div className="text-base">{item.char}</div>
    </div>
  );
}
