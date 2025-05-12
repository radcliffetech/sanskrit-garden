import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "firebase_session",
    secrets: [process.env.SESSION_SECRET || "supersecret"],
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    httpOnly: true,
  },
});

export async function getUserSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function createUserSession(idToken: string, redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("idToken", idToken);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function destroyUserSession(request: Request, redirectTo = "/") {
  const session = await getUserSession(request);
  session.unset("idToken");
  // DESTROY THE SESSION - totally

  sessionStorage.destroySession(session);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function getIdToken(request: Request): Promise<string | null> {
  const session = await getUserSession(request);
  return session.get("idToken") || null;
}
