import type { ShabdaEntry, ShabdaReviewResult } from "~/types";

import { db } from "~/core/lib/firebase/firebase.server";
import nexusConfig from "~/core/config/nexus.config";

const collectionId = nexusConfig.firestore.collections.shabda;
const candidateCollectionId =
  nexusConfig.firestore.collections.shabdaCandidates;
const reviewCollectionId = nexusConfig.firestore.collections.shabdaReviews;

// Add a new candidate noun shabda
export async function addCandidateShabda(entry: ShabdaEntry): Promise<void> {
  const existing = await db
    .collection(candidateCollectionId)
    .doc(entry.id)
    .get();
  if (existing.exists) {
    console.warn(`⚠️ Candidate already exists for id: ${entry.id}`);
    return;
  }
  await db.collection(candidateCollectionId).doc(entry.id).set(entry);
}

// Fetch all candidate noun shabdas
export async function getAllCandidateShabdas(): Promise<ShabdaEntry[]> {
  const snapshot = await db
    .collection(candidateCollectionId)
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
  const approvedEntry = {
    ...entry,
    status: "approved",
    validatedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.collection(collectionId).doc(entry.id).set(approvedEntry);
  await db.collection(candidateCollectionId).doc(entry.id).delete();
}

// Delete a candidate by ID
export async function deleteCandidate(id: string): Promise<void> {
  await db.collection(candidateCollectionId).doc(id).delete();
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
  status: "reviewed" | "applied"
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
