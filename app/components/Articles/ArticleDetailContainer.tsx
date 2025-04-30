import type { Article } from "~/types";
import { Link } from "@remix-run/react";
import { PageHeader } from "~/components/Layout/PageHeader";
import { RenderMarkdown } from "~/components/Shared/RenderMarkdown";

interface Props {
  article: Article;
}

export function ArticleDetailContainer({ article }: Props) {
  return (
    <>
      <Link
        to="/articles"
        className="text-muted hover:underline text-lg mb-4 inline-block text-gray-500"
      >
        ← Back
      </Link>
      <header className="mb-12">
        <PageHeader>{article.title}</PageHeader>
      </header>
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-sm text-gray-600 italic mb-4">
          <p>{article.summary}</p>
        </div>
        <hr className="mt-4 text-sm text-gray-500" />
        <article className="prose lg:prose-xl">
          <section className="mt-8 text-gray-800 leading-relaxed">
            <RenderMarkdown>{article.content}</RenderMarkdown>
          </section>
        </article>
      </div>
    </>
  );
}
