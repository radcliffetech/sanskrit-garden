import AlphabetContainer from "~/components/Alphabet/AlphabetContainer";
import { AlphabetItem } from "~/types";
import type { LoaderFunction } from "react-router";
import type { MetaFunction } from "react-router";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
import { getAlphabetRepository } from "~/core/lib/repositories/alphabetRepository";
import { useLoaderData } from "react-router";

export const meta: MetaFunction = () => {
  return [{ title: "Alphabet" }, { name: "description", content: "Alphabet!" }];
};

export const loader: LoaderFunction = ({ request }) => {
  return getAlphabetRepository()
    .getAlphabet()
    .filter((item) => item.char !== "ॐ");
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
