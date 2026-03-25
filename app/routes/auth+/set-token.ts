import { type ActionFunctionArgs } from "react-router";
import { getAuth } from "firebase-admin/auth";
import { adminApp } from "~/core/lib/firebase/firebase.server";
import { createUserSession } from "~/core/lib/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return Response.json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const decodedToken = await getAuth(adminApp).verifyIdToken(token);
    return createUserSession(token, "/");
  } catch (err) {
    console.error("Token verification failed:", err);
    return Response.json({ error: "Invalid or expired token" }, { status: 401 });
  }
};
