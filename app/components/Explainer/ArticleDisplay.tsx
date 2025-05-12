import { RenderMarkdown } from "~/ui/display/RenderMarkdown";

export function ArticleDisplay({ article }: { article: string }) {
  return (
    <section className="mt-8 text-gray-800 leading-relaxed">
      <RenderMarkdown>{article}</RenderMarkdown>
    </section>
  );
}
