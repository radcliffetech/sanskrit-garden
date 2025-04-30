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
      <h2 className="text-xl text-gray-500 font-light mt-2 mb-4">{author}</h2>
      <div className="prose prose-sm text-gray-700 mb-8">
        <p>{summary}</p>
      </div>
      <VerseList verses={verses} />
    </PageFrame>
  );
}