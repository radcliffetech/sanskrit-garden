import { CurationRepository } from "~/core/lib/curations/stores/CurationRepository";
import { ShabdaEntry } from "~/types";
import { db } from "~/core/lib/firebase/firebase.server";
import nexusConfig from "~/core/config/nexus.config";

const collectionId = nexusConfig.firestore.collections.shabda;
const reviewCollectionId = nexusConfig.firestore.collections.shabdaReviews;
const auditCollectionId = nexusConfig.firestore.collections.shabdaAudit;
const generationRequestCollectionId =
  nexusConfig.firestore.collections.shabdaRequests;

export const shabdaRepo = new CurationRepository<ShabdaEntry>(
  db,
  collectionId,
  reviewCollectionId,
  auditCollectionId,
  generationRequestCollectionId
);
