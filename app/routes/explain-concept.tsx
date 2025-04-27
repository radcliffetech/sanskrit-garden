import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/ui/PageFrame";
import { PageHeader } from "~/components/ui/PageHeader";
import { explainConceptRequest } from "~/loader/explain-concept";
import { marked } from "marked";
import { useState } from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Concept Explainer" },
        { name: "description", content: "Concept Explainer" },
    ];
};

function InstructionsBox() {
  return (
    <div className="border rounded-lg p-6 my-6 bg-gray-50 text-gray-600 space-y-4 shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">How to Use</h2>
      <p>
        Enter a Sanskrit concept and click "Explain" to generate a simple article. This feature uses OpenAI to create clear, student-friendly explanations automatically — a creative blend of AI and traditional learning!
      </p>
      <p>
        Some examples: Shiva, Vishnu, Brahma, Ganesha, Devi, Shakti, Karma, Dharma, Moksha, Maya, Atman, Brahman, Tattva, Prakriti, Purusha, Gunas, Vedas, Upanishads
      </p>
    </div>
  );
}

export default function ExplainConcept() {
    const [concept, setConcept] = useState("");
    const [article, setArticle] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    async function handleExplain() {
        if (!concept.trim()) {
            console.log("[Client] No concept entered. Aborting.");
            return;
        }
        setLoading(true);
        setError(null);
        setArticle(null);
        try {
            const { article } = await explainConceptRequest(concept);
            setArticle(article);
        } catch (err: any) {
            console.error("[Client] Error fetching explanation:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <PageFrame>
            <PageHeader>Concept Explainer</PageHeader>
            <InstructionsBox />
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
                    className={`bg-indigo-400 hover:bg-indigo-500 text-white px-6 py-4 rounded-lg text-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
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

            {error && (
                <p className="text-red-500">{error}</p>
            )}

            {article && (
                <section className="mt-8 text-gray-800 leading-relaxed">
                    <div className="space-y-6" dangerouslySetInnerHTML={{ __html: marked(article) }} />
                </section>
            )}
        </PageFrame>
    );
}