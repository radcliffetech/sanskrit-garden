import { PageFrame } from '~/components/Layout/PageFrame';
import { PageHeader } from '~/components/Layout/PageHeader';
import StorytellerContainer from "~/components/Story/StoryContainer";

export default function StorytellerPage() {
  return (
    <PageFrame>
      <PageHeader>AI Storyteller (यन्त्रकथकः)</PageHeader>
      <StorytellerContainer />
    </PageFrame>
  );
}
