import { ConfirmModal } from "~/components/Shared/ConfirmModal";
import { useState } from "react";

export function EndStoryControl({ handleEndStory }: { handleEndStory: () => void }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <>
      <div className="pt-10 text-center">
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="text-base text-gray-700 hover:text-gray-900 font-medium"
        >
          End Story
        </button>
      </div>
      <ConfirmModal
        isOpen={confirming}
        title="End Story?"
        message="Are you sure you want to end the story? You won't be able to continue it afterward."
        onCancel={() => setConfirming(false)}
        onConfirm={() => {
          setConfirming(false);
          handleEndStory();
        }}
      />
    </>
  );
}
