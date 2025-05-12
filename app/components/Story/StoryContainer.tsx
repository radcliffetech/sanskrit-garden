import {
  DisplayStoryHead,
  DisplayStorySegment,
  ListenerStorySegment,
} from "~/components/Story/Story";
import { getDefaultTopics, useStoryteller } from "~/hooks/useStoryteller";

import { EndStoryControl } from "~/components/Story/EndStoryControl";
import { FadeIn } from "~/ui/core/FadeIn";
import { SectionLoading } from "~/ui/core/SectionLoading";
import { StoryEnd } from "~/components/Story/StoryEnd";
import { StoryQuestionBox } from "~/components/Story/StoryQuestionBox";
import { StoryTopicSelectForm } from "~/components/Story/StoryTopicSelectForm";

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
    <div className="w-full">
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {!isStoryStarted ? (
        loading ? (
          <SectionLoading />
        ) : (
          <>
            <div className="bg-gray-50 border-l-4 border-gray-300 p-4 text-sm text-gray-700 italic">
              <div className="prose prose-sm max-w-none text-gray-700 mb-12">
                <p>Welcome, Traveler!</p>
                <p>
                  Here, stories unfold like petals of a lotus, timeless and
                  boundless.
                </p>
                <p>
                  The tales you encounter are born from tradition and carried on
                  the winds of modern imagination.
                </p>
                <p>
                  As all rivers flow toward the sea, so do these stories seek
                  the heart. Yet remember: what you read is but a reflection,
                  not a final truth.
                </p>
                <p>
                  Read slowly. Wander freely. Let the journey carry you beyond
                  words. And explore perhaps the most mysterious question of
                  them all...
                </p>
                <p>Can an AI tell a good story?</p>
              </div>
            </div>
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
        <div className="">
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
              <ListenerStorySegment
                text={questions[selectedContinuation ?? 0]}
              />
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
    </div>
  );
}
