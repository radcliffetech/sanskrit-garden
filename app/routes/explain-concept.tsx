import { json, type ActionFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { explainConcept } from "~/loader/explain-concept";
import { marked } from "marked";


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const concept = formData.get("concept");
    if (typeof concept !== "string" || concept.trim() === "") {
        return json({ article: "Invalid concept provided." });
    }
    const article = await explainConcept(concept);
    return json({ article });
};

export default function ExplainConcept() {
    const fetcher = useFetcher<typeof action>();

    return (
        <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="prose lg:prose-xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">Sanskrit Concept Explainer</h1>
                    <fetcher.Form method="post" className="mb-6">
                        <input
                            type="text"
                            name="concept"
                            placeholder="Enter a Sanskrit concept..."
                            className="border p-2 mr-2 w-full max-w-md"
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 mt-2">
                            Explain
                        </button>
                    </fetcher.Form>

                    {fetcher.state === "submitting" && (
                        <p className="text-gray-500 italic">Loading explanation...</p>
                    )}

                    {fetcher.data?.article && fetcher.state !== "submitting" && (
                        <section className="mt-8 text-gray-800 leading-relaxed">
                            <div className="space-y-6" dangerouslySetInnerHTML={{ __html: marked(fetcher.data.article) }} />
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}