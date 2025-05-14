import { cert, getApps, initializeApp } from "firebase-admin/app";

import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKeyRaw) {
  throw new Error(
    `[Firebase] Missing one or more required credentials:
     - projectId: ${projectId ? "✅" : "❌"}
     - clientEmail: ${clientEmail ? "✅" : "❌"}
     - privateKey: ${privateKeyRaw ? "✅" : "❌"}`
  );
}

const privateKey = (
  privateKeyRaw.includes("\\n")
    ? privateKeyRaw.replace(/\\n/g, "\n")
    : privateKeyRaw
).replace(/^"|"$/g, "");

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

export const db = getFirestore();
export const adminAuth = getAuth();

const adminApp = getApps()[0];

export { adminApp };
