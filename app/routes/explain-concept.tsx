import ExplainerContainer from "~/components/Explainer/ExplainerContainer";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";

export default function ExplainConcept() {
    return (
        <PageFrame>
            <PageHeader>AI Explainer (यन्त्रविवचकः)</PageHeader>
            <ExplainerContainer />
        </PageFrame>
    );
}