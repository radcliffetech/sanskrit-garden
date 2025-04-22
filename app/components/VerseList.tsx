// components/VerseList.tsx

import { VerseCard } from "./VerseCard";

interface VerseListProps {
  verses: Array<{ id: string, sanskrit: string, transliteration: string, translation: string, commentary: string }>;
}

export const VerseList = ({ verses }: VerseListProps) => (
  <>
    {verses.map((verse, idx) => (
      <VerseCard key={verse.id} verse={verse} index={idx} />
    ))}
  </>
);