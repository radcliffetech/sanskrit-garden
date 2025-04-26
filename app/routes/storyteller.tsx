import Markdown from 'react-markdown'
import { PageFrame } from '~/components/ui/PageFrame';
import { PageHeader } from '~/components/ui/PageHeader';
import { continueStoryRequest } from "~/loader/storyteller";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { storytellerRequest } from "~/loader/storyteller";
import { useState } from "react";

type StorySegment = {
  title: string;
  content: string;
  reference?: string;
  followup?: string;
};

const topics = [
  "A Story of Your Choice",
  "Shiva's Wedding",
  "The Ocean of Milk",
  "The Bhagavad Gita",
  "The Ramayana",
  "The Mahabharata",
  "The Buffalo Demon",
  "Prahalaada and Hiranyakashipu",
  "The Creation of the Universe",
  "OM",
];

function generateStoryText(segments: StorySegment[], lastStorySection: string = ""): string {
  const parts = segments.map((seg, idx) => {
    const titlePrefix = idx === 0 ? "# " : "## ";
    let text = `${titlePrefix}${seg.title}\n\n`;
    text += `STORYTELLER: ${seg.content}\n\n`;
    if (seg.followup) {
      text += `LISTENER: ${seg.followup}\n\n`;
    }
    if (seg.reference) {
      text += `REFERENCES:\n${seg.reference}\n\n`;
    }
    return text;
  });

  if (lastStorySection) {
    parts.push(`\n\nSTORYTELLER:${lastStorySection}\n\n`);
  }

  parts.push("## The End\n\nOm Tat Sat.");

  return parts.join("\n");
}

function StorySelectForm({
  selectedTopic,
  setSelectedTopic,
  handleStartStory,
  loading,
}: {
  selectedTopic: string | null;
  setSelectedTopic: (topic: string) => void;
  handleStartStory: () => void;
  loading: boolean;
}) {
  return (
    <div className="bg-gray-50 border rounded-lg shadow-md p-4 md:p-5 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 w-full max-w-3xl mx-auto text-sm">
      <h2 className="text-xl font-semibold text-gray-500 whitespace-nowrap">Tell me a story about</h2>
      <select
        value={selectedTopic ?? ""}
        onChange={(e) => setSelectedTopic(e.target.value)}
        disabled={loading}
        className="border border-gray-300 rounded p-2 w-full md:w-auto text-sm"
      >
        <option value="" disabled>Select a topic</option>
        {topics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
      <h2 className="text-xl font-semibold text-gray-500 whitespace-nowrap">, please.</h2>
      <button
        type="button"
        onClick={handleStartStory}
        disabled={loading || !selectedTopic}
        className={`px-4 py-2 rounded text-sm font-semibold w-full md:w-auto transition ${selectedTopic ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        {loading ? "Thinking..." : "Start"}
      </button>
    </div>
  );
}

function StoryLanding() {
  return (
    <div className="bg-gray-50  p-6 mt-8 max-w-3xl mx-auto text-center text-sm text-gray-600">
      <h2 className="text-xl font-semibold mb-4">Welcome, Traveler</h2>
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
      <p>
        Read slowly. Wander freely. Let the journey carry you beyond words.
      </p>
    </div>
  );
}

export default function StorytellerPage() {
  // State management
  const [segments, setSegments] = useState<StorySegment[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  const [isStoryOver, setIsStoryOver] = useState(false);
  const [selectedContinuation, setSelectedContinuation] = useState<number | null>(null);

  const collectedReferences = Array.from(
    new Set(
      segments
        .filter((seg) => seg.reference)
        .map((seg) => seg.reference!.trim())
    )
  );

  // Starts a new story based on selected topic
  async function handleStartStory() {
    if (!selectedTopic) return;
    setLoading(true);
    setError(null);
    try {
      const result = await storytellerRequest(selectedTopic);
      setSegments([{ title: result.title, content: result.story, reference: result.reference }]);
      setQuestions(result.questions);
      setBranches(result.branches);
      setIsStoryStarted(true);
      setIsStoryOver(false);
      setSelectedContinuation(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Continues the story based on a selected branch
  async function handleContinue(index: number) {
    if (segments.length === 0 || !branches[index] || !questions[index]) return;
    setSelectedContinuation(index);
    setLoading(true);
    try {
      const result = await continueStoryRequest(
        segments.map(s => s.content).join('\n\n'),
        questions[index],
        branches[index]
      );
      setSegments(prev => [...prev, {
        title: result.title,
        content: result.story,
        reference: result.reference,
        followup: questions[index],
      }]);
      setQuestions(result.questions);
      setBranches(result.branches);
      setIsStoryOver(result.questions.length === 0);
      setSelectedContinuation(null);
    } catch (error) {
      console.error("Error continuing story:", error);
      setSelectedContinuation(null);
    } finally {
      setLoading(false);
    }
  }

  // Reset everything to start fresh
  function handleRestart() {
    setSegments([]);
    setQuestions([]);
    setBranches([]);
    setSelectedTopic(null);
    setError(null);
    setIsStoryStarted(false);
    setIsStoryOver(false);
    setSelectedContinuation(null);
  }

  // Download the full story as a markdown file
  function handleDownload() {
    const storyText = generateStoryText(segments);
    const blob = new Blob([storyText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeTitle = segments[0]?.title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '');
    a.download = `Sanskrit-Garden-${safeTitle || "Untitled"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <PageFrame>
      <PageHeader>Sanskrit Garden</PageHeader>
      {error && <p className="text-red-500 mb-6">{error}</p>}

      {!isStoryStarted ? (
        loading ? (
          <SectionLoading />
        ) : (
          <>
            <StorySelectForm
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              handleStartStory={handleStartStory}
              loading={loading}
            />
            <StoryLanding />
          </>
        )
      ) : (
        // If story has started, show the story page
        <div className="border rounded-lg shadow-md p-6 mb-8">
          <DisplayStoryHead segment={segments[0]} />
          {segments.slice(1).map((segment, idx) => (
            <DisplayStorySegment key={idx} segment={segment} />
          ))}
          <div className="border-t border-gray-200 my-8" />
          {!isStoryOver ? (
            <StoryQuestionBox
              questions={questions}
              loading={loading}
              selectedContinuation={selectedContinuation}
              handleContinue={handleContinue}
              handleEndStory={() => setIsStoryOver(true)}
            />
          ) : (
            <StoryEnd
              onDownload={handleDownload}
              onRestart={handleRestart}
            />
          )}
        </div>
      )}
      {collectedReferences.length > 0 && (
        <div className="p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">References</h2>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {collectedReferences.map((ref, idx) => (
              <li key={idx} className="mb-2 whitespace-pre-line">
                {ref}
              </li>
            ))}
          </ul>
        </div>
      )}
    </PageFrame>
  );
}

function DisplayStoryHead({ segment }: { segment: StorySegment }) {
  return (
    <div className="prose max-w-none mb-6 proseO-p:mb-6">
      <h1 className="text-3xl font-semibold mb-6"><Markdown
        remarkPlugins={[remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        children={segment.title}
      /></h1>
      <h3 className="text-lg text-gray-500 my-6">STORYTELLER</h3>
      <Markdown
        remarkPlugins={[remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        children={segment.content.replace(/\n/gi, "&nbsp; \n")}
      />
    </div>
  );
}

function DisplayStorySegment({ segment }: { segment: StorySegment }) {
  return (
    <div className="prose max-w-none mb-8 prose-p:mb-6 mt-6">
      {segment.followup && (
        <div className="my-8">
          <h3 className="text-lg text-gray-500 my-6">LISTENER</h3>
          <Markdown
            remarkPlugins={[remarkBreaks]}
            rehypePlugins={[rehypeRaw]}
            children={segment.followup.replace(/\n/gi, "&nbsp; \n")}
          />
        </div>
      )}
      {/* <h2 className="text-2xl font-semibold mb-4 text-left">{segment.title}</h2> */}
      <>
        <h3 className="text-lg text-gray-500 my-6">STORYTELLER</h3>
        <Markdown
          remarkPlugins={[remarkBreaks]}
          rehypePlugins={[rehypeRaw]}
          children={segment.content.replace(/\n/gi, "&nbsp; \n")}
        />
      </>
    </div>
  );
}
function StoryEnd({ onRestart, onDownload }: { onRestart: () => void; onDownload: () => void }) {
  return (
    <div className="prose max-w-none mb-8 prose-p:mb-6 text-center">
      <h2 className="text-2xl font-semibold mb-4">The End</h2>
      <div className="flex justify-center mt-4">
        <img
          src="/images/om.png"
          alt="Om Symbol"
          className="h-24 w-24 opacity-70"
        />
      </div>
      <p className="text-gray-600 italic text-2xl my-4">ॐ तत् सत्</p>
      <p className="text-gray-600 italic text-sm">Om Tat Sat</p>
      <div className="mt-8 text-sm text-gray-500">
        <p>This story was created using Sanskrit Garden, a project dedicated to exploring and celebrating Sanskrit literature, mythology, and storytelling through modern technology.</p>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={onDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download Story
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Start New Story
        </button>
      </div>
    </div>
  );
}

function StoryQuestionBox({
  questions,
  loading,
  selectedContinuation,
  handleContinue,
  handleEndStory,
}: {
  questions: string[];
  loading: boolean;
  selectedContinuation: number | null;
  handleContinue: (index: number) => void;
  handleEndStory: () => void;
}) {
  return (
    <div className="prose max-w-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((q, idx) => {
          const isSelected = selectedContinuation === idx;
          const isFaded = selectedContinuation !== null && !isSelected;

          return (
            <button
              key={idx}
              type="button"
              disabled={loading || selectedContinuation !== null}
              onClick={() => handleContinue(idx)}
              className={`border rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center font-medium transition ${isSelected
                ? "bg-indigo-100 border-indigo-400"
                : isFaded
                  ? "opacity-30"
                  : "hover:bg-gray-100"
                }`}
            >
              <div className="font-semibold mb-2">{q}</div>
            </button>
          );
        })}
      </div>
      {loading && (
        <SectionLoading />
      )}
      {!loading && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleEndStory}
            className="text-sm text-gray-600 hover:underline"
          >
            End Story
          </button>
        </div>
      )}
    </div>
  );
}

function SectionLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-gray-400 animate-pulse">
      <svg
        className="h-12 w-12 mb-4 animate-spin text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
    </div>
  );
}
