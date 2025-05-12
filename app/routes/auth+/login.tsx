import { LoginForm } from "~/ui/auth/LoginForm";
import { PageFrame } from "~/ui/layout/PageFrame";
import { PageHeader } from "~/ui/layout/PageHeader";
import { createUserSession } from "~/lib/session.server";
import { getAuth } from "firebase/auth";
import { json } from "@remix-run/node";
import { useAuth } from "~/ui/auth/AuthProvider";
import { useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await emailLogin(email, password);
      const authUser = getAuth().currentUser;
      if (!authUser) return;

      const idToken = await authUser.getIdToken(true); // force fresh token
      const sessionForm = new FormData();
      sessionForm.append("idToken", idToken);
      submit(sessionForm, { method: "post" });
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <PageFrame>
      <PageHeader>Login</PageHeader>
      <LoginForm onSubmit={handleSubmit} error={error || ""} />
    </PageFrame>
  );
}
