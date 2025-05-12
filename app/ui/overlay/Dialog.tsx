import { ReactNode } from "react";

export function Dialog({
  isOpen,
  title,
  children,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg p-6 max-w-lg w-full space-y-4 relative">
        {title && (
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            {title}
          </h2>
        )}
        <div>{children}</div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
