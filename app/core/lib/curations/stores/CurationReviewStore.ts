import type {
  CurationObject,
  CurationReview,
} from "~/core/lib/curations/types/curation";

import type { Firestore } from "firebase-admin/firestore";

export class CurationReviewStore<T extends CurationObject> {
  constructor(private db: Firestore, private reviewCollectionId: string) {}

  async addReview(review: CurationReview<T>): Promise<void> {
    await this.db
      .collection(this.reviewCollectionId)
      .doc(review.id)
      .set({
        ...review,
        reviewedAt: new Date().toISOString(),
      });
  }

  async updateReview(
    id: string,
    data: Partial<CurationReview<T>>
  ): Promise<void> {
    await this.db
      .collection(this.reviewCollectionId)
      .doc(id)
      .update({
        ...data,
        updatedAt: new Date().toISOString(),
      });
  }

  async getReviewById(id: string): Promise<CurationReview<T> | null> {
    const doc = await this.db.collection(this.reviewCollectionId).doc(id).get();
    return doc.exists ? (doc.data() as CurationReview<T>) : null;
  }

  async getReviewsFor(objectId: string): Promise<CurationReview<T>[]> {
    const snapshot = await this.db
      .collection(this.reviewCollectionId)
      .where("objectId", "==", objectId)
      .orderBy("createdAt", "desc")
      .get();
    return snapshot.docs.map((doc) => doc.data() as CurationReview<T>);
  }

  async getAll(): Promise<CurationReview<T>[]> {
    const snapshot = await this.db.collection(this.reviewCollectionId).get();
    return snapshot.docs.map((doc) => doc.data() as CurationReview<T>);
  }

  async filter(
    filters: Partial<Record<keyof CurationReview<T>, any>>
  ): Promise<CurationReview<T>[]> {
    let ref = this.db.collection(
      this.reviewCollectionId
    ) as FirebaseFirestore.Query;
    for (const [field, value] of Object.entries(filters)) {
      if (value !== undefined) {
        ref = ref.where(field, "==", value);
      }
    }
    const snapshot = await ref.get();
    return snapshot.docs.map((doc) => doc.data() as CurationReview<T>);
  }

  async deleteReviewById(id: string): Promise<void> {
    await this.db.collection(this.reviewCollectionId).doc(id).delete();
  }
}
