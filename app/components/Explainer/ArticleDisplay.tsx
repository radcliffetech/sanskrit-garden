import RenderMarkdown  from "~/components/Layout/RenderMarkdown";

export function ArticleDisplay({ article }: { article: string }) {
  return (
    <section className="mt-8 text-gray-800 leading-relaxed">
      <div className="space-y-6">
        <RenderMarkdown>
            {article}
        </RenderMarkdown>
      </div>
    </section>
  );
}