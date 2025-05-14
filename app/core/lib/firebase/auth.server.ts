import { destroyUserSession, getUserSession } from "~/core/lib/session.server";

import { adminAuth } from "~/core/lib/firebase/firebase.server";
import { redirect } from "@remix-run/node";

export async function requireAdminUser(request: Request) {
  const session = await getUserSession(request);
  const idToken = session.get("idToken");

  if (!idToken) throw redirect("/auth/login");
  console.log("idToken", idToken);

  try {
    const decoded = await adminAuth.verifyIdToken(idToken);

    //  use a custom claim
    // to check if the user is an admin
    if (!decoded.admin) {
      throw redirect("/auth/unauthorized");
    }

    return decoded;
  } catch (error) {
    console.error("Error verifying ID token:", error);

    if (process.env.NODE_ENV === "development") {
      console.warn(`
⚠️  Your ID token is likely from the wrong Firebase project.
→ Clear auth state (sign out or use 'Hard Reset Auth')
→ Then log in again to receive a valid token from project: sanskrit-3b00d
        `);
    }

    throw redirect("/auth/login");
  }
}

export async function handleLogout(request: Request) {
  return destroyUserSession(request, "/auth/logged-out");
}
