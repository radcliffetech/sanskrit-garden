import { type LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { getRibhuGitaChapterData } from "~/loader/texts";
import { useLoaderData } from "@remix-run/react";
import { VerseList } from "~/components/VerseList";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";

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


  return (
    <PageFrame>
      <PageHeader>{title}</PageHeader>
      <h2>{author}</h2>
      <p className="text-gray-700 text-lg py-4">{summary}</p>
      <VerseList verses={verses} />
    </PageFrame>
  );
}
