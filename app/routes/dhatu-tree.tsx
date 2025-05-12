import type { DhatuTree } from "~/types";
import { DhatuTreesContainer } from "~/components/DhatuTree/DhatuTreesContainer";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
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
      <p className="w-100 text-gray-600 space-y-4 text-lg mb-10">
        Sanskrit verb roots evolve into a wide variety of forms. A single dhātu
        can produce hundreds of precise words. Select a root to view
        (non-exhaustive) examples - broken down into their morphological
        components.
      </p>
      <DhatuTreesContainer trees={trees} />
    </PageFrame>
  );
}
