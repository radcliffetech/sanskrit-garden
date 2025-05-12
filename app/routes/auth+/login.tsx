import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
import { createUserSession } from "~/lib/session.server";
import { getAuth } from "firebase/auth";
import { json } from "@remix-run/node";
import { useAuth } from "~/ui/auth/AuthProvider";
import { useSubmit } from "@remix-run/react";

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const idToken = formData.get("idToken");

  if (!idToken || typeof idToken !== "string") {
    return json({ error: "Missing ID token" }, { status: 400 });
  }

  return createUserSession(idToken, "/admin");
};

export default function LoginRoute() {
  const { emailLogin } = useAuth();
  const submit = useSubmit();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await emailLogin(email, password);
    const authUser = getAuth().currentUser;
    if (!authUser) return;

    const idToken = await authUser.getIdToken();
    const sessionForm = new FormData();
    sessionForm.append("idToken", idToken);
    submit(sessionForm, { method: "post" });
  }

  return (
    <PageFrame>
      <PageHeader>Login</PageHeader>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-sm mx-auto bg-white p-6 rounded shadow"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          Sign in
        </button>
      </form>
    </PageFrame>
  );
}
