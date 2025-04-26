import Markdown from 'react-markdown'
import { continueStoryRequest } from "~/loader/storyteller";
import { storytellerRequest } from "~/loader/storyteller";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";

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



export default function StorytellerPage() {
  const [story, setStory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [selectedContinuation, setSelectedContinuation] = useState<number | null>(null);

  const navigate = useNavigate();

  async function handleStartStory() {
    if (!selectedTopic) return;
    setLoading(true);
    setError(null);
    try {
      const result = await storytellerRequest(selectedTopic);
      setStory(result.story);
      setQuestions(result.questions);
      setBranches(result.branches);
      setReference(result.reference);
      setStoryTitle(result.title);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleContinue(index: number) {
    if (!story || !branches[index] || !questions[index]) return;
    setSelectedContinuation(index);
    setLoading(true);
    try {
      const result = await continueStoryRequest(story, questions[index], branches[index]);
      setStory((prevStory) => `${prevStory}\n\n${result.continuation}`);
      setQuestions(result.questions);
      setBranches(result.branches);
      setReference(result.reference);
      setStoryTitle(result.title);
    } catch (error) {
      console.error("Error continuing story:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Sanskrit Storyteller</h1>

      {!story ? (
        <>
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
              onClick={handleStartStory}
              disabled={loading || !selectedTopic}
              className={`px-4 py-2 rounded text-sm font-semibold w-full md:w-auto transition ${selectedTopic ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {loading ? "Thinking..." : "Start"}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="border rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">{storyTitle ?? `The Story of ${selectedTopic}`}</h2>
            {loading ? (
              <div className="prose text-gray-500 italic">
                Loading story...
              </div>
            ) : (
              <div className="prose max-w-none mb-8 prose-p:mb-8">
                <Markdown>
                  {story}
                </Markdown>
              </div>

            )}

          {reference && (
              <div className="prose max-w-none mt-12">
                <p className="text-sm text-gray-700 whitespace-pre-line">{reference}</p>
              </div>
            )}
            <div className="border-t border-gray-200 my-8" />

            {questions.length > 0 && (
              <div className="prose max-w-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions.map((q, idx) => {
                    if (selectedContinuation !== null && idx !== selectedContinuation) {
                      return null; // Hide non-selected choices after click
                    }
                    return (
                      <button
                        key={idx}
                        className="border rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center font-medium hover:bg-gray-100 transition"
                        disabled={loading}
                        onClick={() => handleContinue(idx)}
                      >
                        <div className="font-semibold mb-2">{q}</div>
                      </button>
                    );
                  })}
                </div>
                {selectedContinuation !== null && loading && (
                  <div className="mt-4 text-center text-gray-500 italic">Continuing story...</div>
                )}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      setStory(null);
                      setQuestions([]);
                      setBranches([]);
                      setSelectedTopic(null);
                      setError(null);
                      setSelectedContinuation(null);
                    }}
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Cancel and Start Over
                  </button>
                </div>
              </div>
            )}


          </div>
        </>
      )}

      {error && <p className="text-red-500 mb-6">{error}</p>}

      {/* Branch stories temporarily hidden */}
    </div>
  );
}