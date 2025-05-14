import type {
  CurationAudit,
  CurationRequest,
  CurationReview,
} from "~/types/curation";

import { CurationRepository } from "~/core/lib/curation/CurationRepository";
import { ShabdaEntry } from "~/types";
import { db } from "~/core/lib/firebase/firebase.server";
import nexusConfig from "~/core/config/nexus.config";

type ShabdaReview = CurationReview<ShabdaEntry>;
type ShabdaAudit = CurationAudit<ShabdaEntry>;
type ShabdaRequest = CurationRequest<ShabdaEntry>;

const collectionId = nexusConfig.firestore.collections.shabda;
const reviewCollectionId = nexusConfig.firestore.collections.shabdaReviews;
const auditCollectionId = nexusConfig.firestore.collections.shabdaAudit;
const generationRequestCollectionId =
  nexusConfig.firestore.collections.shabdaRequests;

const repo = new CurationRepository<ShabdaEntry>(
  db,
  collectionId,
  reviewCollectionId,
  auditCollectionId,
  generationRequestCollectionId
);

// Add a new candidate noun shabda
export async function addCandidateShabda(entry: ShabdaEntry): Promise<void> {
  const existing = await db.collection(collectionId).doc(entry.id).get();
  if (existing.exists) {
    console.warn(`⚠️ Shabda already exists for id: ${entry.id}`);
    return;
  }
  const candidate = {
    ...entry,
    status: "candidate",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await db.collection(collectionId).doc(entry.id).set(candidate);
}

// Fetch all approved noun shabdas
export async function getAllApprovedShabdas(): Promise<ShabdaEntry[]> {
  const snapshot = await db
    .collection(collectionId)
    .where("status", "==", "approved")
    .get();
  return snapshot.docs.map((doc) => doc.data() as ShabdaEntry);
}

export async function getAllReviews(): Promise<ShabdaReview[]> {
  const snapshot = await db
    .collection(reviewCollectionId)
    .orderBy("createdAt", "desc")
    // .limit(50)å
    .get();

  if (snapshot.empty) {
    console.log("No reviews found.");
    return [];
  }

  return snapshot.docs.map((doc) => doc.data() as ShabdaReview);
}

export async function flushReviews() {
  const snapshot = await db.collection(reviewCollectionId).get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

export const getReviewsByShabdaId = (shabdaId: string) =>
  repo.reviews.getReviewsFor(shabdaId);

export async function deleteReviewById(id: string): Promise<void> {
  await db.collection(reviewCollectionId).doc(id).delete();
}

export const getAllShabdas = () => repo.objects.getAll();

export const storeShabdaAuditLog = (entry: ShabdaAudit) =>
  repo.audits.add(entry);

export async function getAuditLogs(): Promise<ShabdaAudit[]> {
  const snapshot = await db.collection(auditCollectionId).get();
  return snapshot.docs.map((doc) => doc.data() as ShabdaAudit);
}
export async function flushAuditLogs() {
  const snapshot = await db.collection(auditCollectionId).get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

export const getAuditLogsForShabda = (shabdaId: string) =>
  repo.audits.getFor(shabdaId);

// --- Shabda Generation Requests Repository ---
export async function getAllShabdaGenerationRequests(): Promise<
  ShabdaRequest[]
> {
  const snapshot = await db
    .collection(generationRequestCollectionId)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => doc.data() as ShabdaRequest);
}

export const addShabdaGenerationRequest = (r: ShabdaRequest) =>
  repo.requests.add(r);

export const getShabdaRequestsByStatus = (s: string) =>
  repo.requests.getByStatus(s as any);

// Update a shabda generation request by ID
export async function updateShabdaRequest(
  id: string,
  data: Partial<ShabdaRequest>
): Promise<void> {
  await db
    .collection(generationRequestCollectionId)
    .doc(id)
    .update({ ...data, updatedAt: new Date().toISOString() });
}

export const shabdaRepo = new CurationRepository<ShabdaEntry>(
  db,
  collectionId,
  reviewCollectionId,
  auditCollectionId,
  generationRequestCollectionId
);
