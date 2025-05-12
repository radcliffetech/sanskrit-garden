import { AlphabetItem } from "~/types";
import LexicalTreasuryContainer from "~/components/Alphabet/LexicalTreasuryContainer";
import type { LoaderFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
import { getAlphabet } from "~/lib/loader/alphabet";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Alphabet" }, { name: "description", content: "Alphabet!" }];
};

export const loader: LoaderFunction = ({ request }) => {
  return getAlphabet();
};

export default function Alphabet() {
  const data = useLoaderData<AlphabetItem[]>();

  return (
    <PageFrame>
      <PageHeader>Phonetic Groupings (ध्वनिवर्गाः)</PageHeader>
      <p className="w-100 text-gray-600 space-y-4 text-lg mb-10">
        Explore the phonetic structure of Sanskrit through various categorical
        lenses.
      </p>
      <LexicalTreasuryContainer data={data} />
    </PageFrame>
  );
}
