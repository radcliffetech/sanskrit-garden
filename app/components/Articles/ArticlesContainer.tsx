import { Article } from "~/types";
import { ArticleCard } from "./ArticlesCard";

interface Props {
  data: Article[];
}

export default function ArticlesContainer({ data }: Props) {
  return (
    <div>
      <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </div>
  );
}
