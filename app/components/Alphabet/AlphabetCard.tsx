import { AlphabetItem } from "~/types";

export function AlphabetCard({
  item,
  isActive = true,
  highlightLevel = 0,
}: {
  item: AlphabetItem;
  isActive?: boolean;
  highlightLevel?: 0 | 1 | 2;
}) {
  let style = "p-4 border rounded shadow transition text-center ";
  switch (highlightLevel) {
    case 2:
      style += "bg-purple-800 text-white font-bold shadow-xl border-purple-800";
      break;
    case 1:
      style += "bg-purple-200 text-purple-900 font-semibold border-purple-200";
      break;
    default:
      style += "";
  }

  return (
    <div className={style}>
      <div className="text-3xl font-semibold mb-1">{item.char}</div>
      <div className="text-base text-gray-700 italic">{item.latin}</div>
      <div className="text-sm text-gray-500">{item.pronunciation}</div>
    </div>
  );
}


