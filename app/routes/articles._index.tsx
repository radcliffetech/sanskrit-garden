import { Link, useLoaderData } from "@remix-run/react";

import { Article } from "~/types";
import type { LoaderFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/ui/PageFrame";
import { PageHeader } from "~/components/ui/PageHeader";
import { getArticles } from "~/loader/articles";

export const meta: MetaFunction = () => {
  return [
    { title: "Articles" },
    { name: "description", content: "Articles!" },
  ];
};

export const loader: LoaderFunction = ({ request }) => {
  return getArticles();
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <li className="bg-white p-6 rounded shadow hover:shadow-md active:shadow-lg active:scale-[0.98] transition-all flex flex-col">
      <Link
        to={`/articles/${article.id}`}
        className="flex flex-col h-full text-gray-900 no-underline hover:no-underline"
      >
        <h2 className="text-md md:text-lg font-semibold">{article.title}</h2>
        <p className="text-gray-600 mt-10 flex-grow">{article.summary}</p>
        <div className="mt-auto text-right text-gray-500 hover:text-gray-700 text-sm mt-4">
          More →
        </div>
      </Link>
    </li>
  );
}

export default function Articles() {
  const data = useLoaderData<Article[]>();

  return (
    <PageFrame>
      <PageHeader>Articles</PageHeader>
      <div className="mb-6">
        <Link
          to="/explain-concept"
          className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg text-lg transition"
        >
          Try the AI Explainer
        </Link>
      </div>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </PageFrame>
  );
}
