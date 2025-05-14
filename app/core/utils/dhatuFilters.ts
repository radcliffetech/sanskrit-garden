import type { DhatuCatalogEntry } from "~/types";

export function isFiltered(entry: DhatuCatalogEntry, filters: {
  class: number | null;
  voice: "P" | "A" | "U" | null;
  transitivity: "transitive" | "intransitive" | "both" | null;
}) {
  return (
    (filters.class === null || entry.class === filters.class) &&
    (filters.voice === null || entry.voice === filters.voice) &&
    (filters.transitivity === null || entry.transitivity === filters.transitivity)
  );
}