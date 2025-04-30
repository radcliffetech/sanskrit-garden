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
    return getAlphabet();
  };


export default function Alphabet() {
  const data = useLoaderData<AlphabetItem[]>(); 

  return (
    <PageFrame>
      <PageHeader>Alphabet</PageHeader>
      <p className="text-gray-600 mb-8">
      Structured according to the point and manner of articulation, Sanskrit exemplifies an unparalleled scientific approach to language, making it foundational for linguistic and philosophical studies.
      </p>
      <p className="text-gray-600 mb-8">
        Panini codified Sanskrit grammar with unmatched precision in his work Astadhyayi, creating a concise and systematic framework that remains a foundational model for linguistic analysis to this day.
      </p>
      <p className="text-gray-600 mb-8">
        Sanskrit is usually represented in the Devanagari script, which is an abugida, meaning that each character represents a consonant with an inherent vowel sound. The script is written from left to right and has a rich set of diacritical marks to indicate different vowel sounds and other phonetic features.
      </p>

      <div className="grid grid-cols-8 gap-4">
        {data.map((item, index) => (
          <div key={index} className="p-4 border rounded bg-white shadow">
            <div className="text-2xl font-light mb-2">{item.char}</div>
            <div className="text-gray-700 italic">{item.latin}</div>
            <div className="text-sm text-gray-600">{item.pronunciation}</div>
          </div>
        ))}
      </div>
    </PageFrame>
  );
}
