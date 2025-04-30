import type { Article } from "~/types";
import { BackLink } from "../Shared/BackLink";
import { PageHeader } from "~/components/Layout/PageHeader";
import { RenderMarkdown } from "~/components/Shared/RenderMarkdown";

interface Props {
  article: Article;
}

export function ArticleDetailContainer({ article }: Props) {
  return (
    <>
      <BackLink to="/articles">Back to Articles</BackLink>
      <header className="mb-12">
        <PageHeader>{article.title}</PageHeader>
        <p className="text-sm text-gray-500 mb-6 italic">
          By {article.author}
        </p>
      </header>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 border-l-4 border-gray-300 p-4 mb-6 text-sm text-gray-700 italic">
          {article.summary}
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
