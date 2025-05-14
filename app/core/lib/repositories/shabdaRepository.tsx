import type {
  ShabdaAuditEntry,
  ShabdaEntry,
  ShabdaGenerationRequest,
  ShabdaReviewResult,
} from "~/types";

import { db } from "~/core/lib/firebase/firebase.server";
import nexusConfig from "~/core/config/nexus.config";

const collectionId = nexusConfig.firestore.collections.shabda;
const reviewCollectionId = nexusConfig.firestore.collections.shabdaReviews;
const auditCollectionId = nexusConfig.firestore.collections.shabdaAudit;
const generationRequestCollectionId =
  nexusConfig.firestore.collections.shabdaRequests;

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

// Fetch all candidate noun shabdas
export async function getAllCandidateShabdas(): Promise<ShabdaEntry[]> {
  const snapshot = await db
    .collection(collectionId)
    .where("status", "==", "candidate")
    .get();
  return snapshot.docs.map((doc) => doc.data() as ShabdaEntry);
}

// Fetch all approved noun shabdas
export async function getAllApprovedShabdas(): Promise<ShabdaEntry[]> {
  const snapshot = await db
    .collection(collectionId)
    .where("status", "==", "approved")
    .get();
  return snapshot.docs.map((doc) => doc.data() as ShabdaEntry);
}

// Approve a candidate and move it to the main collection
export async function approveCandidate(entry: ShabdaEntry): Promise<void> {
  await db
    .collection(collectionId)
    .doc(entry.id)
    .set({
      ...entry,
      status: "approved" as const,
      validatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
}

// Delete a candidate by ID
export async function deleteCandidate(id: string): Promise<void> {
  await db.collection(collectionId).doc(id).delete();
}

export async function deleteShabdaById(id: string): Promise<void> {
  await db.collection(collectionId).doc(id).delete();
}

export async function storeShabdaReview(
  review: ShabdaReviewResult,
  shabdaId: string
): Promise<void> {
  await db
    .collection(reviewCollectionId)
    .doc(review.id)
    .set({
      ...review,
      shabdaId,
      reviewedAt: new Date().toISOString(),
    });
}

export async function getAllReviews(): Promise<ShabdaReviewResult[]> {
  const snapshot = await db
    .collection(reviewCollectionId)
    .orderBy("createdAt", "desc")
    // .limit(50)å
    .get();

  if (snapshot.empty) {
    console.log("No reviews found.");
    return [];
  }

  return snapshot.docs.map((doc) => doc.data() as ShabdaReviewResult);
}

export async function updateReviewStatus(
  id: string,
  status: "reviewed" | "applied" | "rejected"
) {
  await db.collection(reviewCollectionId).doc(id).update({
    status,
    updatedAt: new Date().toISOString(),
  });
}

export async function getReviewById(
  id: string
): Promise<ShabdaReviewResult | null> {
  const doc = await db.collection(reviewCollectionId).doc(id).get();
  if (!doc.exists) return null;
  return doc.data() as ShabdaReviewResult;
}

export async function flushReviews() {
  const snapshot = await db.collection(reviewCollectionId).get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

export async function getReviewsByShabdaId(
  shabdaId: string
): Promise<ShabdaReviewResult[]> {
  const snapshot = await db
    .collection(reviewCollectionId)
    .where("shabdaId", "==", shabdaId)
    .orderBy("createdAt", "desc")
    .get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => doc.data() as ShabdaReviewResult);
}

export async function deleteReviewById(id: string): Promise<void> {
  await db.collection(reviewCollectionId).doc(id).delete();
}

export async function getAllShabdas(): Promise<ShabdaEntry[]> {
  const snapshot = await db.collection(collectionId).get();
  return snapshot.docs.map((doc) => doc.data() as ShabdaEntry);
}

export async function storeShabdaAuditLog(
  entry: ShabdaAuditEntry
): Promise<void> {
  await db.collection(auditCollectionId).doc(entry.id).set(entry);
}

export async function getAuditLogs(): Promise<ShabdaAuditEntry[]> {
  const snapshot = await db.collection(auditCollectionId).get();
  return snapshot.docs.map((doc) => doc.data() as ShabdaAuditEntry);
}
export async function flushAuditLogs() {
  const snapshot = await db.collection(auditCollectionId).get();
  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

export async function getAuditLogsForShabda(
  shabdaId: string
): Promise<ShabdaAuditEntry[]> {
  const snapshot = await db
    .collection(auditCollectionId)
    .where("shabdaId", "==", shabdaId)
    .orderBy("timestamp", "desc")
    .get();

  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => doc.data() as ShabdaAuditEntry);
}

// --- Shabda Generation Requests Repository ---
export async function getAllShabdaGenerationRequests(): Promise<
  ShabdaGenerationRequest[]
> {
  const snapshot = await db
    .collection(generationRequestCollectionId)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => doc.data() as ShabdaGenerationRequest);
}

// Add a new shabda generation request
export async function addShabdaGenerationRequest(
  request: ShabdaGenerationRequest
): Promise<void> {
  await db
    .collection(generationRequestCollectionId)
    .doc(request.id)
    .set(request);
}

// Get all requests by status
export async function getShabdaRequestsByStatus(
  status: "pending" | "started" | "generated" | "error" | "skipped"
): Promise<ShabdaGenerationRequest[]> {
  const snapshot = await db
    .collection(generationRequestCollectionId)
    .where("status", "==", status)
    .orderBy("createdAt", "asc")
    .get();

  return snapshot.docs.map((doc) => doc.data() as ShabdaGenerationRequest);
}

// Update a shabda generation request by ID
export async function updateShabdaRequest(
  id: string,
  data: Partial<ShabdaGenerationRequest>
): Promise<void> {
  await db
    .collection(generationRequestCollectionId)
    .doc(id)
    .update({ ...data, updatedAt: new Date().toISOString() });
}
