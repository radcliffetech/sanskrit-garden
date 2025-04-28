import { continueStoryRequest, storytellerRequest } from "~/loader/storyteller";

import type { StorySegment } from "~/types";
import { useState } from "react";

export function getDefaultTopics(): string[] {
  return [
    "A Story of Your Choice",
    "Shiva's Wedding",
    "The Ocean of Milk",
    "Arjuna's Dilemma",
    "Rama and Sita",
    "Sati's Sacrifice",
    "The Birth of Ganesha",
    "Skanda's Destiny",
    "Krishna's Līla",
    "The First Yajna",
    "The Vanquishing of the Buffalo Demon",
    "Prahalaada and Hiranyakashipu",
    "The Creation of the Universe",
    "The Primordial Sound",
    "The Dance of Shiva",
  ];
}


// Utility Functions
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

// Handler Functions
async function handleStartStory(
  selectedTopic: string,
  setSegments: React.Dispatch<React.SetStateAction<StorySegment[]>>,
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>,
  setBranches: React.Dispatch<React.SetStateAction<string[]>>,
  setIsStoryStarted: React.Dispatch<React.SetStateAction<boolean>>,
  setIsStoryOver: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  setLoading(true);
  setError(null);

  try {
    const story = await storytellerRequest(selectedTopic);
    setSegments([{ title: selectedTopic, content: story.story }]);
    setQuestions(story.questions || []);
    setBranches(story.branches || []);
    setIsStoryStarted(true);
    setIsStoryOver(false);
  } catch (err: any) {
    setError(err.message || "An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
}

async function handleContinue(
  index: number,
  segments: StorySegment[],
  branches: string[],
  questions: string[],
  setSelectedContinuation: React.Dispatch<React.SetStateAction<number | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSegments: React.Dispatch<React.SetStateAction<StorySegment[]>>,
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>,
  setBranches: React.Dispatch<React.SetStateAction<string[]>>,
  setIsStoryOver: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  if (segments.length === 0 || !branches[index] || !questions[index]) return;
  setSelectedContinuation(index);
  setLoading(true);

  try {
    const story = await continueStoryRequest(
      segments.map(s => s.content).join('\n\n'),
      questions[index],
      branches[index]
    );
    setSegments(prev => [...prev, {
      title: story.title,
      content: story.story,
      reference: story.reference,
      followup: questions[index],
    }]);
    setQuestions(story.questions || []);
    setBranches(story.branches || []);
    setIsStoryOver((story.questions || []).length === 0);
    setSelectedContinuation(null);
  } catch (err: any) {
    setError(err.message || "An unexpected error occurred.");
    setSelectedContinuation(null);
  } finally {
    setLoading(false);
  }
}

function handleRestart(
  setSegments: React.Dispatch<React.SetStateAction<StorySegment[]>>,
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>,
  setBranches: React.Dispatch<React.SetStateAction<string[]>>,
  setSelectedTopic: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsStoryStarted: React.Dispatch<React.SetStateAction<boolean>>,
  setIsStoryOver: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedContinuation: React.Dispatch<React.SetStateAction<number | null>>
) {
  setSegments([]);
  setQuestions([]);
  setBranches([]);
  setSelectedTopic("A Story of Your Choice");
  setLoading(false);
  setError(null);
  setIsStoryStarted(false);
  setIsStoryOver(false);
  setSelectedContinuation(null);
}

function handleDownload(segments: StorySegment[]) {
  const storyText = generateStoryText(segments, segments.at(-1)?.content || "");
  const blob = new Blob([storyText], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeTitle = segments[0]?.title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '');
  a.download = `Sanskrit-Garden-${safeTitle || "Untitled"}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export function useStoryteller() {
  // Story state
  const [segments, setSegments] = useState<StorySegment[]>([]);
  const [questions, setQuestions] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);

  // UI state
  const [selectedTopic, setSelectedTopic] = useState("A Story of Your Choice");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStoryStarted, setIsStoryStarted] = useState(false);
  const [isStoryOver, setIsStoryOver] = useState(false);
  const [selectedContinuation, setSelectedContinuation] = useState<number | null>(null);

  return {
    segments,
    questions,
    branches,
    selectedTopic,
    loading,
    error,
    isStoryStarted,
    isStoryOver,
    selectedContinuation,
    setSelectedTopic,
    setSelectedContinuation,
    setIsStoryOver,
    handleStartStory: () => handleStartStory(
      selectedTopic,
      setSegments,
      setQuestions,
      setBranches,
      setIsStoryStarted,
      setIsStoryOver,
      setLoading,
      setError
    ),
    handleContinue: (index: number) => handleContinue(
      index,
      segments,
      branches,
      questions,
      setSelectedContinuation,
      setLoading,
      setSegments,
      setQuestions,
      setBranches,
      setIsStoryOver,
      setError
    ),
    handleRestart: () => handleRestart(
      setSegments,
      setQuestions,
      setBranches,
      setSelectedTopic,
      setLoading,
      setError,
      setIsStoryStarted,
      setIsStoryOver,
      setSelectedContinuation
    ),
    handleDownload: () => handleDownload(segments),
  };
}