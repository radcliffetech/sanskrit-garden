import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type FeedbackButtonsProps = {
  appId: string;
  configurationId: string;
  outputId: string;
  metadata?: Record<string, any>;
  labels?: {
    helpful?: string;
    notHelpful?: string;
    thanks?: string;
  };
};

export function FeedbackButtons({
  appId,
  configurationId,
  outputId,
  metadata,
  labels,
}: FeedbackButtonsProps) {
  const [submitted, setSubmitted] = useState<"up" | "down" | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setShowThanks(true), 300);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  async function handleVote(vote: "up" | "down") {
    setSubmitted(vote);
    const payload = {
      appId,
      configurationId,
      outputId,
      vote,
      metadata,
      createdAt: new Date().toISOString(),
    };

    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  return (
    <div className="flex justify-center gap-4 mt-4 min-h-[3rem] transition-opacity duration-500">
      {showThanks ? (
        <div className="text-sm text-gray-400 animate-fade-in animate-glow backdrop-blur-md">
          Thanks for your input!
        </div>
      ) : (
        <div className="text-gray-400 flex gap-4">
          <div className="relative group">
            <button
              onClick={() => handleVote("up")}
              className="p-2 rounded-full transition active:scale-90 animate-click-pop"
            >
              <HandThumbUpIcon className="w-6 h-6" />
            </button>
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs text-gray-600 bg-white border border-gray-300 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {labels?.helpful ?? "Good"}
            </span>
          </div>

          <div className="relative group">
            <button
              onClick={() => handleVote("down")}
              className="p-2 rounded-full transition active:scale-90 animate-click-pop"
            >
              <HandThumbDownIcon className="w-6 h-6" />
            </button>
            <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs text-gray-600 bg-white border border-gray-300 rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {labels?.notHelpful ?? "Not Good"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
