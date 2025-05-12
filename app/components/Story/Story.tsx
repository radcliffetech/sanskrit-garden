import { RenderMarkdown } from "~/ui/display/RenderMarkdown";
import type { StorySegment } from "~/types";

export function DisplayStoryHead({ segment }: { segment: StorySegment }) {
  return (
    <div className="prose max-w-none mb-6 proseO-p:mb-6">
      <h1 className="text-3xl font-light mb-6">
        <RenderMarkdown>{segment.title}</RenderMarkdown>
      </h1>
      <h3 className="text-lg text-gray-500 my-6">STORYTELLER</h3>
      <RenderMarkdown>{segment.content}</RenderMarkdown>
    </div>
  );
}

export function DisplayStorySegment({ segment }: { segment: StorySegment }) {
  return (
    <div className="prose max-w-none mb-6 prose-p:mb-6 mt-6">
      {segment.followup && <ListenerStorySegment text={segment.followup} />}
      <h3 className="text-lg text-gray-500 my-6">STORYTELLER</h3>
      <RenderMarkdown>{segment.content}</RenderMarkdown>{" "}
    </div>
  );
}

export function ListenerStorySegment({ text }: { text: string }) {
  return (
    <div className="my-6">
      <h3 className="text-lg text-gray-500 my-6">LISTENER</h3>
      <RenderMarkdown>{text}</RenderMarkdown>
    </div>
  );
}
