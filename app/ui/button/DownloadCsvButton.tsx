import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

interface ButtonProps {
  onClick: () => void;
}
export function DownloadCsvButton({ onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      title="Download CSV"
      className="p-2 rounded border bg-white hover:bg-gray-100 transition"
    >
      <ArrowDownTrayIcon className="w-5 h-5 text-gray-600" />
    </button>
  );
}
