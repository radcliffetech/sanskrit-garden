import { TrashIcon } from "@heroicons/react/24/outline";

export function DeleteButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <button
      type="button"
      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-700"
      title="Delete"
      onClick={onClick}
    >
      <TrashIcon className="w-6 h-6" />
    </button>
  );
}
