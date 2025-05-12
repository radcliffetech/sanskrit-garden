import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };
import nexusConfig from "../app/config/nexus.config.js";

initializeApp({
  credential: cert(serviceAccount),
});

const auth = getAuth();

async function setAdminClaim() {
  try {
    const userEmail = nexusConfig.adminEmail; // change as needed

    const user = await auth.getUserByEmail(userEmail);
    console.log(`✅ Found user: ${user.email} (${user.uid})`);
    await auth.setCustomUserClaims(user.uid, { adminGarden: true });

    console.log(`✅ Set admin: true for ${user.email}`);
  } catch (error) {
    console.error("❌ Failed to set admin claim:", error.message);
  }
}

setAdminClaim().catch(console.error);
