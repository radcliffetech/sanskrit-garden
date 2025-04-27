export function InstructionsBox({ setConcept, exampleSet }: { setConcept: (concept: string) => void, exampleSet: string[] }) {
  return (
    <div className="border rounded-lg p-6 my-6 bg-gray-50 text-gray-600 space-y-4 shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">How to Use</h2>
      <p>Enter a Sanskrit concept and click "Explain" to generate a simple article. This feature uses OpenAI to create clear, student-friendly explanations automatically — a creative blend of AI and traditional learning!</p>
      <p>Examples:</p>
      <div className="flex flex-wrap gap-2">
        {exampleSet.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setConcept(example)}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}