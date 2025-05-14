import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArticleDetailContainer } from "~/components/Articles/ArticleDetailContainer";
import { PageFrame } from "~/ui/layout/PageFrame";
import { getArticleById } from "~/core/lib/repositories/articlesRepository";

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    throw new Response("Not Found", { status: 404 });
  }
  const article = await getArticleById(id);
  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }
  return article;
}

export default function ArticleDetail() {
  const article = useLoaderData<typeof loader>();

  return (
    <PageFrame>
      <ArticleDetailContainer article={article} />
    </PageFrame>
  );
}
