import { PageFrame } from '~/ui/layout/PageFrame';
import { PageHeader } from '~/ui/layout/PageHeader';
import StorytellerContainer from "~/components/Story/StoryContainer";

export default function StorytellerPage() {
  return (
    <PageFrame>
      <PageHeader>AI Storyteller (यन्त्रकथकः)</PageHeader>
      <StorytellerContainer />
    </PageFrame>
  );
}
