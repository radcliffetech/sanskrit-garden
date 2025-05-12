import { Link, useLoaderData } from "@remix-run/react";

import { Article } from "~/types";
import ArticlesContainer from "~/components/Articles/ArticlesContainer";
import type { LoaderFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";
import { getArticles } from "~/lib/loader/articles";

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
    <PageFrame>
      <PageHeader>Articles (लेखाः)</PageHeader>
      <ArticlesContainer data={data} />
    </PageFrame>
  );
}
