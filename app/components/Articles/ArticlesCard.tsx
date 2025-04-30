import type { Article } from "~/types";
import { Link } from "@remix-run/react";

export function ArticleCard({ article }: { article: Article }) {
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