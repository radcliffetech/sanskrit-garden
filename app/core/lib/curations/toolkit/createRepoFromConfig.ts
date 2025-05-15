import type { CurationObject } from "../types/curation";
import { CurationRepository } from "../stores/CurationRepository";
import { db } from "~/core/lib/firebase/firebase.server";

export function createRepoFromConfig<T extends CurationObject>(
  collectionId: string,
  version: string
): CurationRepository<T> {
  const repo = CurationRepository.fromNamespace<T>(db, collectionId, version);
  return repo;
}
