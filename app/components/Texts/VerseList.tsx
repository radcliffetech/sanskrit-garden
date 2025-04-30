// components/VerseList.tsx
import type { Verse } from "~/types"; // Adjust the import path as necessary
import { VerseCard } from "./VerseCard";

interface VerseListProps {
  verses: Verse[]
}

export const VerseList = ({ verses }: VerseListProps) => (
  <section className="space-y-6 sm:space-y-8 lg:space-y-10">
    {verses.map((verse, idx) => (
      <VerseCard key={verse.id} verse={verse} index={idx} />
    ))}
  </section>
);