import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";
import type { Verse } from "~/types";
import { VerseList } from "~/components/Texts/VerseList";
interface Props {
  title: string;
  author: string;
  summary: string;
  verses: Verse[];
}

export default function TextDisplayContainer({ title, author, summary, verses }: Props) {
  return (
    <PageFrame>
      <PageHeader>{title}</PageHeader>
      <h2>{author}</h2>
      <p className="text-gray-700 text-lg py-4">{summary}</p>
      <VerseList verses={verses} />
    </PageFrame>
  );
}