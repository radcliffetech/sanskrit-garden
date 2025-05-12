import { ArrowDownTrayIcon, ClipboardIcon } from "@heroicons/react/24/outline";

export function CopyToClipboardButton({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button
      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition"
      title="Copy Correspondence to Clipboard"
      onClick={() => {
        handleCopy();
        if (onClick) {
          onClick();
        }
      }}
    >
      <ClipboardIcon className="w-6 h-6 text-blue-600" />
    </button>
  );
}
