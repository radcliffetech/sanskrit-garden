import { type LoaderFunctionArgs } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import TextDisplayContainer from "~/components/Texts/TextDisplayContainer";
import { getTextsRepository } from "~/core/lib/repositories/textsRepository";

export const meta: MetaFunction = () => {
  return [{ title: "Gita" }, { name: "description", content: "Gita!" }];
};
export async function loader({}: LoaderFunctionArgs) {
  return await getTextsRepository().ribhuGita();
}

export default function Gita() {
  const { verses, title, description, author } = useLoaderData<typeof loader>();

  return (
    <TextDisplayContainer
      title={title}
      author={author}
      description={description}
      verses={verses}
    />
  );
}
