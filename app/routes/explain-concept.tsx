import { useEffect, useState } from "react";

import { ArticleDisplay } from "~/components/concept-explainer/ArticleDisplay";
import { ConceptForm } from "~/components/concept-explainer/ConceptForm";
import { InstructionsBox } from "~/components/concept-explainer/InstructionsBox";
import { PageFrame } from "~/components/ui/PageFrame";
import { PageHeader } from "~/components/ui/PageHeader";
import { SectionLoading } from "~/components/ui/SectionLoading";
import { explainConceptRequest } from "~/loader/explain-concept";
import { useConceptExplainer } from "~/hooks/concept-explainer";

export default function ExplainConcept() {
    const explainer = useConceptExplainer();
    const [exampleSet, setExampleSet] = useState<string[]>([]);
    const [concept, setConcept] = useState("");
    const [article, setArticle] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleExplain() {
        if (!concept.trim()) return;
        setLoading(true);
        setError(null);
        setArticle(null);
        try {
            const { article } = await explainConceptRequest(concept);
            setArticle(article);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setExampleSet(explainer.exampleSet);
    }, []);

    return (
        <PageFrame>
            <PageHeader>Concept Explainer</PageHeader>
            <InstructionsBox setConcept={(concept: string) => {
                setConcept(concept);
            }} exampleSet={exampleSet} />
            <ConceptForm
                concept={concept}
                setConcept={setConcept}
                handleExplain={handleExplain}
                loading={loading}
            />
            {loading ? (
                <SectionLoading />
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : article ? (
                <ArticleDisplay article={article} />
            ) : null}
        </PageFrame>
    );
}