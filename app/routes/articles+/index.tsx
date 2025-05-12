import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { Article } from "~/types";
import ArticlesContainer from "~/components/Articles/ArticlesContainer";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
import { getArticlesRepository } from "~/lib/repositories/articlesRepository";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Articles" }, { name: "description", content: "Articles!" }];
};

export const loader: LoaderFunction = ({ request }) => {
  return getArticlesRepository().getAll();
};

export default function Articles() {
  const data = useLoaderData<Article[]>();

  return (
    <PageFrame>
      <PageHeader>Articles (लेखाः)</PageHeader>
      <ArticlesContainer data={data} />
    </PageFrame>
  );
}
