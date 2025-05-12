import { json, type ActionFunctionArgs } from "@remix-run/node";
import { getAuth } from "firebase-admin/auth";
import { adminApp } from "~/lib/firebase/firebase.server";
import { createUserSession } from "~/lib/session.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return json({ error: "No token provided" }, { status: 401 });
  }

  try {
    const decodedToken = await getAuth(adminApp).verifyIdToken(token);
    return createUserSession(token, "/");
  } catch (err) {
    console.error("Token verification failed:", err);
    return json({ error: "Invalid or expired token" }, { status: 401 });
  }
};
