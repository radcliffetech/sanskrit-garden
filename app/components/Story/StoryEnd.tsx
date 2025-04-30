import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { ConfirmModal } from "~/components/Shared/ConfirmModal";
import { useState } from "react";

export function StoryEnd({ onRestart, onDownload }: { onRestart: () => void; onDownload: () => void }) {
    const [confirming, setConfirming] = useState(false);

    return (
      <div className="prose max-w-none mb-12 prose-p:mb-6 text-center mx-auto">
        <h2 className="text-2xl font-light mb-6">The End</h2>
        <div className="flex justify-center mt-6">
          <img
            src="/images/om.png"
            alt="Om Symbol"
            className="h-28 w-28 opacity-70"
          />
        </div>
        <div className="mt-10 text-sm text-gray-500">
          <p>This story was created using AI, an exploration and celebrating of Sanskrit literature, mythology, and storytelling and it intersection with modern technology.</p>
        </div>
        <div className="flex justify-center gap-6 mt-10">

          <button
            type="button"
            onClick={onDownload}
            className="text-sm text-gray-500 hover:text-gray-700 transition flex items-center gap-1"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download Story
          </button>
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="btn-primary"
          >
            Start New Story
          </button>
        </div>
        <ConfirmModal
          isOpen={confirming}
          title="Start New Story?"
          message="Are you sure you want to start over? Your current story will be lost."
          onCancel={() => setConfirming(false)}
          onConfirm={() => {
            setConfirming(false);
            onRestart();
          }}
        />
      </div>
    );
  }