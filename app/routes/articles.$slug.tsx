import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ArticleDetailContainer } from "~/components/Articles/ArticleDetailContainer";
import { PageFrame } from "~/components/Layout/PageFrame";
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
      <ArticleDetailContainer article={article} />
    </PageFrame>
  );
}