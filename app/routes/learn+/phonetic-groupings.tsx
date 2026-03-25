import { AlphabetItem } from "~/types";
import LexicalTreasuryContainer from "~/components/Alphabet/LexicalTreasuryContainer";
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
  return getAlphabetRepository().getAlphabet();
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
