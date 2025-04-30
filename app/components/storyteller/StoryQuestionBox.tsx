import RenderMarkdown from "~/components/Layout/RenderMarkdown";

export function StoryQuestionBox({
  questions,
  loading,
  selectedContinuation,
  handleContinue,
}: {
  questions: string[];
  loading: boolean;
  selectedContinuation: number | null;
  handleContinue: (index: number) => void;
}) {
  return (
    <div className="prose max-w-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((q, idx) => {
          const isSelected = selectedContinuation === idx;
          const isFaded = selectedContinuation !== null && !isSelected;

          return (
            <button
              key={idx}
              type="button"
              disabled={loading || selectedContinuation !== null}
              onClick={() => handleContinue(idx)}
              className={`border rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center font-medium transition ${isSelected
                ? "bg-indigo-100 border-indigo-400"
                : isFaded
                  ? "opacity-30"
                  : "hover:bg-gray-100"
                }`}
            >
              <div className="font-light mb-2 text-center">
                <RenderMarkdown>
                  {q}
                </RenderMarkdown>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
