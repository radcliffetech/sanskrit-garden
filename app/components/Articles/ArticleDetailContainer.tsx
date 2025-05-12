import type { Article } from "~/types";
import { BackLink } from "~/ui/layout/BackLink";
import { PageHeader } from "~/ui/layout/PageHeader";
import { RenderMarkdown } from "~/ui/display/RenderMarkdown";

interface Props {
  article: Article;
}

export function ArticleDetailContainer({ article }: Props) {
  return (
    <>
      <header className="mb-12">
        <PageHeader>{article.title}</PageHeader>
        <BackLink to="/articles">Back to Articles</BackLink>
      </header>
      <div className="">
        <div className="bg-gray-50 border-l-4 border-gray-300 p-4 mb-6 text-sm text-gray-700 italic">
          {article.description}
        </div>
        <article className="prose lg:prose-xl">
          <section className="mt-8 text-gray-800 leading-relaxed">
            <RenderMarkdown>{article.content}</RenderMarkdown>
          </section>
        </article>
      </div>
    </>
  );
}
