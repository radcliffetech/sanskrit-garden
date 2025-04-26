import type { MetaFunction } from "@remix-run/node";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getNirvanaShaktamData } from "~/loader/texts";
import { VerseList } from "~/components/VerseList";

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
        <div className="px-4 py-6">
            <h1 className="text-3xl font-bold">{title}</h1>
            <h2>{author}</h2>
            <p className="text-gray-700 text-lg py-4">{summary}</p>
             <VerseList verses={verses} />
        </div>
    );
}
