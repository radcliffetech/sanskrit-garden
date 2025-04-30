import { AlphabetItem } from "~/types";
import type { LoaderFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";
import PhonemeExplorerContainer from "~/components/Alphabet/PhonemeExplorerContainer";
import { getAlphabet } from "~/loader/alphabet";
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
      <PageHeader>Mandala of Letters</PageHeader>
      <p className="w-100 text-gray-600 space-y-4 text-lg mb-10">
        Explore the phonetic structure of Sanskrit through various categorical
        lenses.
      </p>
      <PhonemeExplorerContainer data={data} />
    </PageFrame>
  );
}
