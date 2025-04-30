import { AlphabetItem } from "~/types";

export function AlphabetCard({
  item,
  highlightLevel = 0,
  mode,
}: {
  item: AlphabetItem;
  highlightLevel?: 0 | 1 | 2;
  mode?: "compact";
}) {
  let style = "p-4 border rounded shadow transition text-center ";
  if (highlightLevel === 2) {
    style += "highlight-2";
  } else if (highlightLevel === 1) {
    style += "highlight-1";
  }

  return (
    <div className={style}>
      <div className="text-3xl font-semibold mb-1">{item.char}</div>
      {mode !== "compact" && (
        <>
          <div className="text-base italic opacity-80">{item.latin}</div>
          <div className="text-sm opacity-50">{item.pronunciation}</div>
        </>
      )}
    </div>
  );
}
