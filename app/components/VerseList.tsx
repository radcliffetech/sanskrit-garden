// components/VerseList.tsx

import { VerseCard } from "./VerseCard";

interface VerseListProps {
  verses: Array<{ id: string, sanskrit: string, transliteration: string, translation: string, commentary: string }>;
}

export const VerseList = ({ verses }: VerseListProps) => (
  <div className="space-y-4">
    {verses.map((verse, idx) => (
      <VerseCard key={verse.id} verse={verse} index={idx} />
    ))}
  </div>
);