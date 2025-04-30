import type { MetaFunction } from "@remix-run/node";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getNirvanaShaktamData } from "~/loader/texts";
import { VerseList } from "~/components/VerseList";
import { Page } from "openai/pagination.mjs";
import { PageFrame } from "~/components/Layout/PageFrame";
import { PageHeader } from "~/components/Layout/PageHeader";

export const meta: MetaFunction = () => {
    return [
        { title: "Nirvana Shaktam" },
        { name: "description", content: "Verses of the Nirvana Shaktam." },
    ];
};

export async function loader({ }: LoaderFunctionArgs) {
    return await getNirvanaShaktamData();
}

export default function NirvanaShaktamPage() {
    const { verses, title, author, summary } = useLoaderData<typeof loader>();

    return (
        <PageFrame>
            <PageHeader>{title}</PageHeader>
            <h2>{author}</h2>
            <p className="text-gray-700 text-lg py-4">{summary}</p>
             <VerseList verses={verses} />
        </PageFrame>
    );
}
