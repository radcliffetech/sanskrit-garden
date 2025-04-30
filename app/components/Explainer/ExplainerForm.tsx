export function ExplainerForm({
    concept,
    setConcept,
    handleExplain,
    loading,
  }: {
    concept: string;
    setConcept: (concept: string) => void;
    handleExplain: () => void;
    loading: boolean;
  }) {
    return (
      <div className="my-6 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          placeholder="Enter a Sanskrit concept..."
          className="border rounded-lg p-4 w-full text-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <button
          onClick={handleExplain}
          disabled={loading}
          className={`btn-primary ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          ) : (
            "Explain"
          )}
        </button>
      </div>
    );
  }