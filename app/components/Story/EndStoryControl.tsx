export function EndStoryControl({ handleEndStory }: { handleEndStory: () => void }) {
    return (
      <div className="pt-10 text-center">
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
          className="text-base text-gray-700 hover:text-gray-900 font-medium"
        >
          End Story
        </button>
      </div>
    );
  }
  
