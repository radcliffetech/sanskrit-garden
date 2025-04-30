import LearningHomeContainer from "~/components/Learning/LearningHomeContainer";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";

export default function LearningIndex() {
  return (
    <PageFrame>
      <PageHeader>Learning Tools (अध्ययनोपकरणानि)</PageHeader>
      <LearningHomeContainer />
    </PageFrame>
  );
}