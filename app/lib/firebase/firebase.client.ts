// app/lib/firebase.client.ts
import { getApps, initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);



export async function getFreshIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) return null;
  return await user.getIdToken(true); // `true` forces refresh
}


export { app, auth, storage };
