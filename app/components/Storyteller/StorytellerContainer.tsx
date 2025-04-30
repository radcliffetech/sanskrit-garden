import {
  DisplayStoryHead,
  DisplayStorySegment,
  ListenerStorySegment,
} from "./Story";
import { getDefaultTopics, useStoryteller } from "~/hooks/storyteller";

import { EndStoryControl } from "~/components/Storyteller/EndStoryControl";
import { FadeIn } from "~/components/Shared/FadeIn";
import { SectionLoading } from "~/components/Shared/SectionLoading";
import { StoryEnd } from "~/components/Storyteller/StoryEnd";
import { StoryLanding } from "~/components/Storyteller/StoryLanding";
import { StoryQuestionBox } from "~/components/Storyteller/StoryQuestionBox";
import { StoryTopicSelectForm } from "~/components/Storyteller/StoryTopicSelectForm";

export default function StorytellerContainer() {
const {
    segments,
    questions,
    selectedTopic,
    loading,
    error,
    isStoryStarted,
    isStoryOver,
    selectedContinuation,
    setSelectedTopic,
    setIsStoryOver,
    handleStartStory,
    handleContinue,
    handleRestart,
    handleDownload,
  } = useStoryteller();

  const collectedReferences = Array.from(
    new Set(
      segments
        .filter((seg) => seg.reference)
        .map((seg) => seg.reference!.trim())
    )
  );

  return (
    <>
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {!isStoryStarted ? (
        loading ? (
          <SectionLoading />
        ) : (
          <>
            <StoryLanding>
              <h2 className="text-xl font-light mb-4">Welcome, Traveler</h2>
              <p className="mb-2">
                Here, stories unfold like petals of a lotus, timeless and boundless.
              </p>
              <p className="mb-2">
                The tales you encounter are born from tradition and carried on the winds of modern imagination.
              </p>
              <p className="mb-2">
                As all rivers flow toward the sea, so do these stories seek the heart.
                Yet remember: what you read is but a reflection, not a final truth.
              </p>
              <p className="mb-2">
                Read slowly. Wander freely. Let the journey carry you beyond words. And explore the question...
              </p>
              <p className="mb-2">
                Can an AI tell a good story?
              </p>
            </StoryLanding>
            <StoryTopicSelectForm
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              handleStartStory={handleStartStory}
              loading={loading}
              topics={getDefaultTopics()}
            />
          </>
        )
      ) : (
        <div className="border rounded-lg shadow-md p-6 mb-8 bg-white">
          <DisplayStoryHead segment={segments[0]} />
          {segments.slice(1).map((segment, idx) => (
            <FadeIn key={idx}>
              <DisplayStorySegment segment={segment} />
            </FadeIn>
          ))}
          {!isStoryOver && !loading && (
            <FadeIn>
              <div className="border-t border-gray-200 my-8" />
              <StoryQuestionBox
                questions={questions}
                loading={loading}
                selectedContinuation={selectedContinuation}
                handleContinue={handleContinue}
              />
            </FadeIn>
          )}
          {loading && (
            <FadeIn>
              <ListenerStorySegment text={questions[selectedContinuation ?? 0]} />
              <div className="prose max-w-none proseO-p:mb-6">
                <h3 className="text-lg text-gray-500">STORYTELLER</h3>
                <SectionLoading />
              </div>
            </FadeIn>
          )}
          {!loading && !isStoryOver && (
            <EndStoryControl handleEndStory={() => setIsStoryOver(true)} />
          )}
          {!loading && isStoryOver && (
            <FadeIn>
              <StoryEnd onDownload={handleDownload} onRestart={handleRestart} />
            </FadeIn>
          )}
        </div>
      )}

      {collectedReferences.length > 0 && (
        <div className="p-6 mb-8">
          <h2 className="text-2xl font-light mb-4">References</h2>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {collectedReferences.map((ref, idx) => (
              <li key={idx} className="mb-2 whitespace-pre-line">
                {ref}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}