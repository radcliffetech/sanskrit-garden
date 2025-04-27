export function StoryEnd({ onRestart, onDownload }: { onRestart: () => void; onDownload: () => void }) {
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
        <div className="mt-8 text-sm text-gray-500">
          <p>This story was created using AI, an exploration and celebrating of Sanskrit literature, mythology, and storytelling and it intersection with modern technology.</p>
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
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to start a new story? Your current story will be lost."
                )
              ) {
                onRestart();
              }
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Start New Story
          </button>
        </div>
      </div>
    );
  }
  