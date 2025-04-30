import { AlphabetItem } from "~/types";
import type { LoaderFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";
import  PhonemeExplorer from "~/components/Alphabet/PhonemeExplorer"
import { getAlphabet } from "~/loader/alphabet";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Alphabet" },
    { name: "description", content: "Alphabet!" },
  ];
};

export const loader: LoaderFunction = ({ request }) => {
  return getAlphabet();
};

export default function Alphabet() {
  const data = useLoaderData<AlphabetItem[]>();

  return (
    <PageFrame>
      <PageHeader>Phoneme Explorer</PageHeader>
      <PhonemeExplorer data={data} />
    </PageFrame>
  );
}
