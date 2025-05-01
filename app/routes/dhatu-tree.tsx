import { PageFrame, PageHeader } from "~/components/Layout";

import type { DhatuTree } from "~/types";
import { DhatuTreesContainer } from "~/components/Verbs/DhatuTreesContainer";
import type { LoaderFunctionArgs } from "@remix-run/node";
import dhatuData from "~/data/verbs/dhatu-data.json";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export function loader({}: LoaderFunctionArgs) {
  return json(dhatuData as DhatuTree[]);
}

export default function DhatuTreePage() {
  const trees = useLoaderData<typeof loader>();
  return (
    <PageFrame>
      <PageHeader>Dhātu Evolution (धातवः)</PageHeader>
      <DhatuTreesContainer trees={trees} />
    </PageFrame>
  );
}