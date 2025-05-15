import type {
  CurationAudit,
  CurationObject,
} from "~/core/lib/curations/types/curation";

import type { Firestore } from "firebase-admin/firestore";

export class CurationAuditTrail<T extends CurationObject> {
  constructor(private db: Firestore, private auditCollectionId: string) {}

  async add(entry: CurationAudit<T>): Promise<void> {
    await this.db.collection(this.auditCollectionId).doc(entry.id).set(entry);
  }

  async delete(id: string): Promise<void> {
    await this.db.collection(this.auditCollectionId).doc(id).delete();
  }

  async getFor(objectId: string): Promise<CurationAudit<T>[]> {
    const snapshot = await this.db
      .collection(this.auditCollectionId)
      .where("objectId", "==", objectId)
      .orderBy("timestamp", "desc")
      .get();
    return snapshot.docs.map((doc) => doc.data() as CurationAudit<T>);
  }

  async flush(): Promise<void> {
    const snapshot = await this.db.collection(this.auditCollectionId).get();
    const batch = this.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }
}
