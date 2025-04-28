import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { marked } from "marked";
import { PageFrame } from "~/components/ui/PageFrame";
import { PageHeader } from "~/components/ui/PageHeader";
import { getArticleById } from "~/loader/articles";

export async function loader({ params }: LoaderFunctionArgs) {
  const { slug } = params;
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }
  const article = await getArticleById(slug);
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }
  return article;
}

export default function ArticleDetail() {
  const article = useLoaderData<typeof loader>();

  return (
    <PageFrame>
      <Link to="/articles" className="text-muted hover:underline text-lg mb-2 inline-block text-gray-500">
        ← Back
      </Link>
      <header className="mb-12">
        <PageHeader>{article.title}</PageHeader>
      </header>
      <div className="max-w-4xl mx-auto">
        <p className="mt-2 text-lg text-gray-600 italic">{article.summary}</p>
        <hr className="mt-4 text-sm text-gray-500">
        </hr>
        <article className="prose lg:prose-xl">
          <section className="mt-8 text-gray-800 leading-relaxed">
            <div className="space-y-6" dangerouslySetInnerHTML={{ __html: marked(article.content) }} />
          </section>
        </article>
      </div>
    </PageFrame>
  );
}