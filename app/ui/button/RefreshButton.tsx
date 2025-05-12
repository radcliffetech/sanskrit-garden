import { ArrowPathIcon } from "@heroicons/react/20/solid";

export function RefreshButton({
  onClick,
  isSpinning,
  title = "Refresh",
}: {
  onClick: () => void;
  isSpinning: boolean;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="p-2 rounded-full bg-action-primary/10 hover:bg-action-primary/20 transition"
      title={title}
    >
      <ArrowPathIcon
        className={`w-8 h-8 text-action-primary ${
          isSpinning ? "animate-spin" : ""
        }`}
      />
    </button>
  );
}
