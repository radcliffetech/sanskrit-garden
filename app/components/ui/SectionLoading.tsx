export function SectionLoading() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 opacity-50 animate-pulse">
        <svg
          className="h-12 w-12 mb-4 animate-spin text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </div>
    );
  }
  