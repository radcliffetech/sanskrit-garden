import { CurationAuditTrail } from "./CurationAuditTrail";
import type { CurationObject } from "../types/curation";
import { CurationRequestQueue } from "./CurationRequestQueue";
import { CurationReviewStore } from "./CurationReviewStore";
import type { Firestore } from "firebase-admin/firestore";

class CurationObjectStore<T extends CurationObject> {
  constructor(
    private readonly db: Firestore,
    private readonly collectionId: string
  ) {}

  async getAll(): Promise<T[]> {
    const snapshot = await this.db.collection(this.collectionId).get();
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async filter(filters: Partial<Record<keyof T, any>>): Promise<T[]> {
    let ref = this.db.collection(this.collectionId) as FirebaseFirestore.Query;
    for (const [field, value] of Object.entries(filters)) {
      if (value !== undefined) {
        ref = ref.where(field, "==", value);
      }
    }
    const snapshot = await ref.get();
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async getById(id: string): Promise<T | null> {
    const doc = await this.db.collection(this.collectionId).doc(id).get();
    return doc.exists ? (doc.data() as T) : null;
  }

  async add(entry: T): Promise<void> {
    await this.db.collection(this.collectionId).doc(entry.id).set(entry);
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    await this.db
      .collection(this.collectionId)
      .doc(id)
      .update({ ...data, updatedAt: new Date().toISOString() });
  }

  async delete(id: string): Promise<void> {
    await this.db.collection(this.collectionId).doc(id).delete();
  }

  async flush(): Promise<void> {
    const snapshot = await this.db.collection(this.collectionId).get();
    const batch = this.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
}

export class CurationRepository<T extends CurationObject> {
  public readonly objects: CurationObjectStore<T>;
  public readonly reviews: CurationReviewStore<T>;
  public readonly audits: CurationAuditTrail<T>;
  public readonly requests: CurationRequestQueue<T>;

  constructor(
    private readonly db: Firestore,
    collectionId: string,
    reviewCollectionId: string,
    auditCollectionId: string,
    requestCollectionId: string
  ) {
    this.objects = new CurationObjectStore<T>(db, collectionId);
    this.reviews = new CurationReviewStore<T>(db, reviewCollectionId);
    this.audits = new CurationAuditTrail<T>(db, auditCollectionId);
    this.requests = new CurationRequestQueue<T>(db, requestCollectionId);
  }

  static fromNamespace<T extends CurationObject>(
    db: Firestore,
    namespace: string,
    version: string
  ): CurationRepository<T> {
    return new CurationRepository<T>(
      db,
      `${namespace}_v${version}`,
      `${namespace}_reviews_v${version}`,
      `${namespace}_audit_v${version}`,
      `${namespace}_requests_v${version}`
    );
  }
}
