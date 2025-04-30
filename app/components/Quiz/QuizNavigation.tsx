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
        className="btn-secondary flex items-center disabled:opacity-50"
      >
        <ChevronLeftIcon className="h-5 w-5 inline-block mr-1" />
        Previous
      </button>
      {currentIndex  < total ? (
        <button
          type="button"
          onClick={onNext}
          className="btn-primary flex items-center"
        >
          Next
          <ChevronRightIcon className="h-5 w-5 inline-block ml-1" />
        </button>
      ) : (
        <button
          type="submit"
          onClick={onSubmit}
          className="btn-primary bg-green-600 hover:bg-green-700 flex items-center"
        >
          Complete Quiz
            <ChevronRightIcon className="h-5 w-5 inline-block ml-1" />
        </button>
      )}
    </div>
  );
}