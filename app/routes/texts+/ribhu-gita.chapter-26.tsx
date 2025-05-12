import { type LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { getRibhuGitaChapterData } from "~/lib/loader/texts";
import { useLoaderData } from "@remix-run/react";
import TextDisplayContainer from "~/components/Texts/TextDisplayContainer";

export const meta: MetaFunction = () => {
  return [
    { title: "Gita" },
    { name: "description", content: "Gita!" },
  ];
};
export async function loader({ }: LoaderFunctionArgs) {
  return await getRibhuGitaChapterData();;
}

export default function Gita() {
  const { verses, title, summary, author } = useLoaderData<typeof loader>();

  return <TextDisplayContainer title={title} author={author} summary={summary} verses={verses} />;
}
