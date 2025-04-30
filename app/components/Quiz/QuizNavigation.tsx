import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export function QuizNavigation({
  currentIndex,
  total,
  onPrevious,
  onNext,
  onSubmit,
}: {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="flex justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 flex items-center"
      >
        <ChevronLeftIcon className="h-5 w-5 inline-block mr-1" />
        Previous
      </button>
      {currentIndex  < total ? (
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
        >
          Next
          <ChevronRightIcon className="h-5 w-5 inline-block ml-1" />
        </button>
      ) : (
        <button
          type="submit"
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Complete Quiz
            <ChevronRightIcon className="h-5 w-5 inline-block ml-1" />
        </button>
      )}
    </div>
  );
}