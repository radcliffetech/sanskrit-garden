import { PageFrame, PageHeader } from "~/components/Layout";

import { DhatuCatalogContainer } from "~/components/Verbs/DhatuCatalogContainer";
import type { DhatuCatalogEntry } from "~/types";
import type { LoaderFunctionArgs } from "@remix-run/node";
import dhatuIndex from "~/data/verbs/dhatu-index.json";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader({}: LoaderFunctionArgs) {
  return json(dhatuIndex as DhatuCatalogEntry[]);
}

export default function DhatuCatalogRoute() {
  const entries = useLoaderData<typeof loader>();

  return (
    <PageFrame>
      <PageHeader>Dhatu Categories (धातुगणाः)</PageHeader>
      <DhatuCatalogContainer entries={entries} />
    </PageFrame>
  );
}
