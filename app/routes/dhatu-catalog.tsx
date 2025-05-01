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
      <PageHeader>Dhātu Catalog</PageHeader>
      <p className="w-100 text-gray-600 space-y-4 text-lg mb-10">
        Explore an indexed list of Sanskrit verb roots (dhātus), grouped by
        class, voice, and transitivity.
      </p>
      <DhatuCatalogContainer entries={entries} />
    </PageFrame>
  );
}
