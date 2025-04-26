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

export default function ExplainConcept() {
    const [concept, setConcept] = useState("");
    const [article, setArticle] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);



    async function handleExplain() {
        if (!concept.trim()) {
            console.log("No concept entered. Aborting.");
            return;
        }
        console.log("Starting explanation request for:", concept);
        setLoading(true);
        setError(null);
        setArticle(null);
        try {
            const result = await explainConceptRequest(concept);
            console.log("Received article:", result);
            setArticle(result);
        } catch (err: any) {
            console.error("Error fetching explanation:", err);
            setError(err.message);
        } finally {
            console.log("Explanation request complete.");
            setLoading(false);
        }
    }

    return (
        <PageFrame>
            <PageHeader>Concept Explainer</PageHeader>
            <p className="text-gray-700 mt-2">
                Enter a Sanskrit concept and click "Explain" to generate a simple article. This feature uses OpenAI to create clear, student-friendly explanations automatically — a creative blend of AI and traditional learning!
            </p>
            <div className="my-6">
                <input
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    placeholder="Enter a Sanskrit concept..."
                    className="border p-2 mr-2 w-full max-w-md"
                />
                <button
                    onClick={handleExplain}
                    className={`bg-blue-500 text-white p-2 mt-2 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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