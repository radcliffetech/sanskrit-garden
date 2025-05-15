// scripts/load-collection.js
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFile } from "fs/promises";
import path from "path";
import serviceAccount from "../../serviceAccountKey.json" assert { type: "json" };

const [, , collectionName, jsonFilePath] = process.argv;
const isDryRun = process.argv.includes("--dry-run");

if (!collectionName || !jsonFilePath) {
  console.error(
    "Usage: node load-collection.js <collectionName> <jsonFilePath>"
  );
  process.exit(1);
}

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function loadCollection() {
  try {
    const fullPath = path.resolve(jsonFilePath);
    const fileData = await readFile(fullPath, "utf-8");
    const records = JSON.parse(fileData);

    if (!Array.isArray(records)) {
      throw new Error("The JSON file must contain an array of documents.");
    }
    for (const doc of records) {
      if (typeof doc !== "object" || doc === null) {
        throw new Error("Each record must be a non-null object.");
      }
      if (doc.id && typeof doc.id !== "string") {
        throw new Error("Document 'id' must be a string if present.");
      }
    }

    if (isDryRun) {
      console.log(
        `🧪 Dry run: would load ${records.length} records into ${collectionName}`
      );
      console.log(JSON.stringify(records.slice(0, 3), null, 2));
    } else {
      const batch = db.batch();
      const collectionRef = db.collection(collectionName);
      records.forEach((doc) => {
        const docRef = doc.id ? collectionRef.doc(doc.id) : collectionRef.doc();
        batch.set(docRef, doc);
      });
      await batch.commit();
      console.log(`✅ Loaded ${records.length} records into ${collectionName}`);
    }
  } catch (err) {
    console.error("❌ Failed to load collection:", err.message);
  }
}

loadCollection().catch(console.error);
