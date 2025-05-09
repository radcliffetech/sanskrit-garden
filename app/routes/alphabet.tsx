import AlphabetContainer from "~/components/Alphabet/AlphabetContainer";
import { AlphabetItem } from "~/types";
import type { LoaderFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";
import { getAlphabet } from "~/loader/alphabet";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Alphabet" },
    { name: "description", content: "Alphabet!" },
  ];
};

export const loader: LoaderFunction = ({ request }) => {
  return getAlphabet().filter((item) => item.char !== "ॐ");
};

export default function Alphabet() {
  const data = useLoaderData<AlphabetItem[]>();

  return (
    <PageFrame>
      <PageHeader>Sanskrit Alphabet (संस्कृतवर्णमाला)</PageHeader>
      <AlphabetContainer data={data} />
    </PageFrame>
  );
}
