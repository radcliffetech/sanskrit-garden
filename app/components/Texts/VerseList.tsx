// components/VerseList.tsx
import type { Verse } from "~/types"; // Adjust the import path as necessary
import { VerseCard } from "./VerseCard";

interface VerseListProps {
  verses: Verse[]
}

export const VerseList = ({ verses }: VerseListProps) => (
  <div className="space-y-4">
    {verses.map((verse, idx) => (
      <VerseCard key={verse.id} verse={verse} index={idx} />
    ))}
  </div>
);