import { DhatuCatalogContainer } from "~/components/DhatuTree/DhatuCategoriesContainer";
import type { DhatuCatalogEntry } from "~/types";
import type { LoaderFunctionArgs } from "react-router";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
import dhatuIndex from "~/data/verbs/dhatu-index.json";
import { useLoaderData } from "react-router";

export function loader({}: LoaderFunctionArgs) {
  return Response.json(dhatuIndex as DhatuCatalogEntry[]);
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
