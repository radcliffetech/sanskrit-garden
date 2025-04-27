
export function EndStoryControl({ handleEndStory }: { handleEndStory: () => void }) {
    return (
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to end the story? You won't be able to continue it afterward."
              )
            ) {
              handleEndStory();
            }
          }}
          className="text-sm text-gray-600 hover:underline"
        >
          End Story
        </button>
      </div>
    );
  }
  
  