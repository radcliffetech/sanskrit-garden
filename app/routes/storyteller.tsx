import { PageFrame } from '~/components/Layout/PageFrame';
import { PageHeader } from '~/components/Layout/PageHeader';
import StorytellerContainer from "~/components/Story/StorytellerContainer";

export default function StorytellerPage() {
  return (
    <PageFrame>
      <PageHeader>AI Storyteller</PageHeader>
      <StorytellerContainer />
    </PageFrame>
  );
}
