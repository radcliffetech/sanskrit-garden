import { marked } from "marked";

interface VerseProps {
    verse: {
      id: string;
      sanskrit: string;
      transliteration: string;
      translation: string;
      commentary: string;
    };
    index: number;
  }
  
export const VerseCard = ({ verse, index }: VerseProps) => (
    <div key={verse.id} className="p-6 border rounded bg-gray-50 space-y-6 shadow-sm">
      <p className="text-lg font-semibold">Verse {index + 1}</p>
      <p
        className="font-sanskrit text-xl whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: verse.sanskrit.replace(/\n/g, "<br />") }}
      />
      <p className="italic text-sm text-gray-500"
        dangerouslySetInnerHTML={{ __html: verse.transliteration.replace(/\n/g, "<br />") }}
      />
      <p
        className="text-base"
        dangerouslySetInnerHTML={{ __html: marked.parse(verse.translation) }}
      />
      <p
        className="text-sm text-gray-600"
        dangerouslySetInnerHTML={{ __html: marked.parse(verse.commentary) }}
      />
    </div>
  );