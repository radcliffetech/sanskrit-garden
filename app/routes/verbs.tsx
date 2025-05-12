import { LoaderFunctionArgs, json } from "@remix-run/node";

import { PageFrame } from '~/ui/layout/PageFrame';
import { PageHeader } from '~/ui/layout/PageHeader';
import type { VerbShabda } from "~/types";
import { VerbsContainer } from "~/components/Verbs/VerbsContainer";
import sampleShabdas from "~/data/verbs/verb-data.json";
import { useLoaderData } from "@remix-run/react";

export function loader({}: LoaderFunctionArgs) {
  const verbs: VerbShabda[] = sampleShabdas.map((shabda) => ({
    ...shabda,
    tense: shabda.tense as "present" | "past" | "future",
    voice: shabda.voice as "active" | "middle" | "passive",
    conjugation: Object.fromEntries(
      Object.entries(shabda.conjugation).map(([person, forms]) => [
        person,
        [forms[0] || "", forms[1] || "", forms[2] || ""] as [string, string, string],
      ])
    ),
  }));
  return { verbs };
}

export default function ShabdaLandingPage() {
  const { verbs } = useLoaderData<typeof loader>();
  return (
    <PageFrame>
      <PageHeader>Verbs (धातवः)</PageHeader>
      <VerbsContainer verbs={verbs} />
    </PageFrame>
  );
}
