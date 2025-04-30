import type { Article } from "~/types";
import { Link } from "@remix-run/react";
import { PageHeader } from "~/components/Layout/PageHeader";
import { marked } from "marked";

interface Props {
  article: Article;
}

export function ArticleDetailContainer({ article }: Props) {
  return (
    <>
      <Link
        to="/articles"
        className="text-muted hover:underline text-lg mb-2 inline-block text-gray-500"
      >
        ← Back
      </Link>
      <header className="mb-12">
        <PageHeader>{article.title}</PageHeader>
      </header>
      <div className="max-w-4xl mx-auto">
        <p className="mt-2 text-lg text-gray-600 italic">{article.summary}</p>
        <hr className="mt-4 text-sm text-gray-500" />
        <article className="prose lg:prose-xl">
          <section className="mt-8 text-gray-800 leading-relaxed">
            <div
              className="space-y-6"
              dangerouslySetInnerHTML={{ __html: marked(article.content) }}
            />
          </section>
        </article>
      </div>
    </>
  );
}
