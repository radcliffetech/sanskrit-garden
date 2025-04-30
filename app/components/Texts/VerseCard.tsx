import type { Verse } from "~/types";
import { marked } from "marked";
interface VerseProps {
    verse: Verse;
    index: number;
    displayCommentary?: boolean;
  }
  
export const VerseCard = ({ verse, index, displayCommentary = false }: VerseProps) => {

  return (

    <div className="p-6 border rounded bg-gray-50 space-y-6 shadow-sm">
      <p className="text-lg font-semibold text-gray-600">Verse {index + 1}</p>
      <p
        className="font-sanskrit text-xl whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: verse.sanskrit.replace(/\n/g, "<br />") }}
      />
      <p className="italic text-sm text-gray-500"
        dangerouslySetInnerHTML={{ __html: verse.transliteration.replace(/\n/g, "<br />") }}
      />
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: marked.parse(verse.translation) }}
      />
      {displayCommentary && (
              <div
        className="prose prose-sm max-w-none text-gray-600"
        dangerouslySetInnerHTML={{ __html: marked.parse(verse.commentary) }}
      />
      )}  
    </div>
  )
}