import type { ActionFunction } from "@remix-run/node";
import { createUserSession } from "~/core/lib/session.server";
import { json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const { idToken } = await request.json();

  if (!idToken || typeof idToken !== "string") {
    return json({ error: "Missing or invalid ID token" }, { status: 400 });
  }

  // Refresh session with the new token
  return createUserSession(idToken, "/");
};
