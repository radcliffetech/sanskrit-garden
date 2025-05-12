import LearningHomeContainer from "~/components/Learning/LearningHomeContainer";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";

export default function LearningIndex() {
  return (
    <PageFrame>
      <PageHeader>Learning Tools (अध्ययनोपकरणानि)</PageHeader>
      <LearningHomeContainer />
    </PageFrame>
  );
}