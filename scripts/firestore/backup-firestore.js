// scripts/backup-firestore.js
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { writeFile } from "fs/promises";
import path from "path";
import serviceAccount from "../../serviceAccountKey.json" assert { type: "json" };
import nexusConfig from "../../app/core/config/nexus.config.js";

const { firestore } = nexusConfig;

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function backupCollection(collectionName) {
  try {
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const outputPath = path.resolve("tmp", `${collectionName}.json`);
    await writeFile(outputPath, JSON.stringify(data, null, 2));
    console.log(`✅ Backed up ${collectionName}`);
  } catch (err) {
    console.error(`❌ Failed to backup ${collectionName}:`, err.message);
  }
}

const collectionsToBackup = Object.values(firestore.collections);

async function runBackup() {
  for (const collectionName of collectionsToBackup) {
    await backupCollection(collectionName);
  }

  console.log("✅ All collections backed up successfully. Namaste!");
}

import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "⚠️  This will overwrite existing backup files. Proceed? (y/N) ",
  async (answer) => {
    rl.close();
    if (answer.toLowerCase() !== "y") {
      console.log("❌ Backup aborted.");
      process.exit(0);
    }
    await runBackup().catch(console.error);
  }
);
