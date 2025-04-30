import { LoaderFunctionArgs, json } from "@remix-run/node";
import { PageFrame, PageHeader } from "~/components/Layout";

import type { Shabda } from "~/types";
import { ShabdaContainer } from "~/components/Shabda/ShabdaContainer";
import sampleShabdas from "~/data/shabdas/masculine-a-stem.json";
import { useLoaderData } from "@remix-run/react";

export function loader({}: LoaderFunctionArgs) {
  const result: Shabda = sampleShabdas[0];
  return json(result);
}

export default function ShabdaLandingPage() {
  const shabda = useLoaderData<typeof loader>();
  return (
    <PageFrame>
      <PageHeader>Śabda: The Word in Sanskrit</PageHeader>
      <ShabdaContainer shabda={shabda} />
    </PageFrame>
  );
}
