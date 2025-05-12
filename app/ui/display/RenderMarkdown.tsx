import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

export function RenderMarkdown({ children }: { children: string }) {
  // trim leading and trailing whitespace
  const trimmedChildren = children.trim();
  return (
    <div className="prose markdown">
      <Markdown
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkBreaks, remarkGfm]}
      >
        {trimmedChildren}
      </Markdown>
    </div>
  );
}
