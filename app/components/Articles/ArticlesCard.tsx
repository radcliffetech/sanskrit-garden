import type { Article } from "~/types";
import { Link } from "@remix-run/react";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <li className="px-6 py-4 border rounded bg-white shadow-md hover:shadow-lg transition-shadow flex flex-col">
      <Link
        to={`/articles/${article.id}`}
        className="flex flex-col h-full text-gray-900 no-underline hover:no-underline"
      >
        <h2 className="text-lg font-light text-gray-800 mb-4">{article.title}</h2>
        <p className="text-sm text-gray-600">
          {article.summary.length > 200 ? `${article.summary.slice(0, 200)}...` : article.summary}
        </p>
        <div className="mt-auto text-right text-sm text-gray-500 hover:text-gray-700">
          More →
        </div>
      </Link>
    </li>
  );
}