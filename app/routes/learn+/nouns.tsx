import { LoaderFunctionArgs } from "@remix-run/node";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
import type { Shabda } from "~/types";
import { ShabdaContainer } from "~/components/Shabda/ShabdaContainer";
import sampleShabdas from "~/data/nouns/masculine-a-stem.json";
import { useLoaderData } from "@remix-run/react";

export function loader({}: LoaderFunctionArgs) {
  const shabdas: Shabda[] = sampleShabdas;
  return { shabdas };
}

export default function ShabdaLandingPage() {
  const { shabdas } = useLoaderData<typeof loader>();
  return (
    <PageFrame>
      <PageHeader>Nouns (संज्ञाः)</PageHeader>
      <ShabdaContainer shabdas={shabdas} />
    </PageFrame>
  );
}
