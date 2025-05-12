export function NewButton({
  onClick,
  text = "New",
}: {
  onClick: () => void;
  text?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-sm border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50"
    >
      + {text}
    </button>
  );
}
