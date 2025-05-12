// Removed Card, ListGroup imports
import { useEffect, useState } from "react";

import type { Article } from "~/types";
import { FadeIn } from "~/ui/core/FadeIn";
import { RenderMarkdown } from "~/ui/display/RenderMarkdown";
import { useSearchParams } from "~/ui/remix";

export function ArticlesBrowser({
  topics,
  searchable = false,
  displayDescription = true,
}: {
  topics: Article[];
  searchable?: boolean;
  displayDescription?: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTopicId = searchParams.get("topic");
  const selectedTopic = topics.find((t) => t.slug === selectedTopicId) || null;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (selectedTopicId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedTopicId]);

  const filteredTopics = searchable
    ? topics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.content?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : topics;

  return (
    <div className="border rounded bg-white shadow">
      <div className="p-0">
        {!selectedTopic ? (
          <>
            {searchable && (
              <div className="p-3 flex items-center gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="p-0 text-gray-500 text-xl no-underline"
                    onClick={() => setSearchQuery("")}
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            {filteredTopics.length > 0 ? (
              <div className="divide-y">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.slug}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100 flex justify-between items-start"
                    onClick={() => setSearchParams({ topic: topic.slug })}
                  >
                    <div>
                      <div className="font-light text-lg mb-1">
                        {topic.title}
                      </div>
                      {displayDescription && (
                        <div className="text-gray-500 text-sm">
                          {topic.description}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-500 ml-2">→</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[50vh]">
                <p className="text-gray-500 text-xl">No matches found</p>
              </div>
            )}
          </>
        ) : (
          <FadeIn>
            <div className="flex justify-between items-center mb-4 px-4 py-2">
              <a
                href="#"
                className="text-gray-500 no-underline inline-flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchParams({});
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                ← Back
              </a>
              <h2 className="text-2xl font-light mt-1">
                {selectedTopic.title}
              </h2>
            </div>
            <div className="p-3 pt-0">
              <RenderMarkdown>{selectedTopic.content}</RenderMarkdown>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}
