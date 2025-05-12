import type { MetaFunction } from "@remix-run/node";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import TextDisplayContainer from "~/components/Texts/TextDisplayContainer";
import { getTextsRepository } from "~/lib/repositories/textsRepository";

export const meta: MetaFunction = () => {
  return [
    { title: "Nirvana Shaktam" },
    { name: "description", content: "Verses of the Nirvana Shaktam." },
  ];
};

export async function loader({}: LoaderFunctionArgs) {
  return await getTextsRepository().nirvanaShaktam();
}

export default function NirvanaShaktamPage() {
  const { verses, title, author, summary } = useLoaderData<typeof loader>();

  return (
    <TextDisplayContainer
      title={title}
      author={author}
      summary={summary}
      verses={verses}
    />
  );
}
