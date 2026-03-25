import type { ActionFunction } from "react-router";
import { createUserSession } from "~/core/lib/session.server";

export const action: ActionFunction = async ({ request }) => {
  const { idToken } = await request.json();

  if (!idToken || typeof idToken !== "string") {
    return Response.json({ error: "Missing or invalid ID token" }, { status: 400 });
  }

  // Refresh session with the new token
  return createUserSession(idToken, "/");
};
