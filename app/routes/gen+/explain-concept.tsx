import ExplainerContainer from "~/components/Explainer/ExplainerContainer";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";

export default function ExplainConcept() {
    return (
        <PageFrame>
            <PageHeader>AI Explainer (यन्त्रविवचकः)</PageHeader>
            <ExplainerContainer />
        </PageFrame>
    );
}