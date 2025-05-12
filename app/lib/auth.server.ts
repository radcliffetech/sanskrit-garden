import { destroyUserSession, getUserSession } from "~/lib/session.server";

import { adminAuth } from "~/lib/firebase.server";
import { redirect } from "@remix-run/node";

export async function requireAdminUser(request: Request) {
  const session = await getUserSession(request);
  const idToken = session.get("idToken");

  if (!idToken) throw redirect("/auth/login");

  const decoded = await adminAuth.verifyIdToken(idToken);

  // use a custom claim
  // to check if the user is an admin
  if (!decoded.admin) {
    throw redirect("/auth/unauthorized");
  }

  return decoded;
}

export async function handleLogout(request: Request) {
  return destroyUserSession(request, "/auth/logged-out");
}
