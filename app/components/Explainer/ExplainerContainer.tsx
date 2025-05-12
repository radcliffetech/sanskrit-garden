import { useEffect, useState } from "react";

import { ArticleDisplay } from "~/components/Explainer/ArticleDisplay";
import { ExplainerForm } from "~/components/Explainer/ExplainerForm";
import { InstructionsBox } from "~/components/Explainer/InstructionsBox";
import { SectionLoading } from "~/ui/core/SectionLoading";
import { useConceptExplainer } from "~/hooks/useConceptExplainer";

export default function ExplainerContainer() {
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
      const { article } = await explainer.explainConceptRequest(concept);
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
    <>
      <InstructionsBox setConcept={setConcept} exampleSet={exampleSet} />
      <ExplainerForm
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
    </>
  );
}
