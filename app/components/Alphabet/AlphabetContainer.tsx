import { AlphabetGrid } from "./AlphabetGrid";
import { AlphabetItem } from "~/types";
interface Props {
  data: AlphabetItem[];
}

export default function AlphabetContainer({ data }: Props) {
  return (
    <>
      <div className="prose prose-sm text-gray-600 mb-8 space-y-4">
        <p>
          Structured according to the point and manner of articulation, Sanskrit exemplifies an unparalleled scientific approach to language, making it foundational for linguistic and philosophical studies.
        </p>
        <p>
          Panini codified Sanskrit grammar with unmatched precision in his work Astadhyayi, creating a concise and systematic framework that remains a foundational model for linguistic analysis to this day.
        </p>
        <p>
          Sanskrit is usually represented in the Devanagari script, which is an abugida, meaning that each character represents a consonant with an inherent vowel sound. The script is written from left to right and has a rich set of diacritical marks to indicate different vowel sounds and other phonetic features.
        </p>
      </div>

      <AlphabetGrid data={data} />
    </>
  );
}
