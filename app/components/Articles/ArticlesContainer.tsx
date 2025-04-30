import { Article } from "~/types";
import { ArticleCard } from "./ArticlesCard";
import { Link } from "@remix-run/react";

interface Props {
  data: Article[];
}

export default function ArticlesContainer({ data }: Props) {
  return (
    <>
      <div className="mb-6">
        <Link
          to="/explain-concept"
          className="btn-primary"
        >
          Try the AI Explainer
        </Link>
      </div>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </>
  );
}
