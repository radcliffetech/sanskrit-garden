import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getArticlesRepository } from "~/lib/repositories/articlesRepository";
import { marked } from "marked";
export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }
  const article = await getArticlesRepository().getArticleById(slug);
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }
  return article;
}

export default function ArticleDetail() {
  const article = useLoaderData<typeof loader>();
  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <article className="prose lg:prose-xl"> 
          <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{article.title}</h1>
            <p className="mt-2 text-lg text-gray-600 italic">{article.summary}</p>
          </header>
          <section className="mt-8 text-gray-800 leading-relaxed">
            <div className="space-y-6" dangerouslySetInnerHTML={{ __html: marked(article.content) }} />
          </section>
        </article>
    </div>
    </div>
  );
}