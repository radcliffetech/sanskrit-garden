import type { CurationObject, CurationRequest } from "../types/curation";

import type { Firestore } from "firebase-admin/firestore";

export class CurationRequestQueue<T extends CurationObject> {
  constructor(private db: Firestore, private requestCollectionId: string) {}

  async add(request: CurationRequest<T>): Promise<void> {
    await this.db
      .collection(this.requestCollectionId)
      .doc(request.id)
      .set(request);
  }

  async update(id: string, data: Partial<CurationRequest<T>>): Promise<void> {
    await this.db
      .collection(this.requestCollectionId)
      .doc(id)
      .update({
        ...data,
        updatedAt: new Date().toISOString(),
      });
  }

  async getByStatus(
    status: CurationRequest<T>["status"]
  ): Promise<CurationRequest<T>[]> {
    const snapshot = await this.db
      .collection(this.requestCollectionId)
      .where("status", "==", status)
      .orderBy("createdAt", "asc")
      .get();
    return snapshot.docs.map((doc) => doc.data() as CurationRequest<T>);
  }

  async flush(): Promise<void> {
    const snapshot = await this.db.collection(this.requestCollectionId).get();
    const CHUNK_SIZE = 500;
    for (let i = 0; i < snapshot.docs.length; i += CHUNK_SIZE) {
      const batch = this.db.batch();
      const chunk = snapshot.docs.slice(i, i + CHUNK_SIZE);
      chunk.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
    }
  }
}
