import { Article } from "~/types";
import type { LoaderFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { getArticles } from "~/loader/articles";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Articles" },
    { name: "description", content: "Articles!" },
  ];
};

export const loader: LoaderFunction = ({ request }) => {
    return getArticles();
  };
  



export default function Articles() {
  const data = useLoaderData<Article[]>(); 

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Articles</h1>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => (
          <li key={article.id} className="bg-white p-6 rounded shadow hover:shadow-md transition-shadow flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-900">{article.title}</h2>
            <p className="text-gray-600 mt-2 flex-grow">{article.summary}</p>
            <div className="mt-auto">
              <a href={`/articles/${article.id}`} className="text-blue-600 hover:underline mt-4 inline-block">
                Read more →
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
