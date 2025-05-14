import { LoaderFunctionArgs } from "@remix-run/node";
import { handleLogout } from "~/core/lib/firebase/auth.server";
import { useAuth } from "~/ui/auth/AuthProvider";
import { useEffect } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return handleLogout(request);
};

export default function LogoutRoute() {
  const { run } = useLogoutFlow();

  useEffect(() => {
    run();
  }, [run]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Logging out...</h1>
      <p className="mt-4">You are being logged out. Please wait.</p>
    </div>
  );
}

function useLogoutFlow() {
  const { logout } = useAuth();

  const run = async () => {
    try {
      console.log("[useLogoutFlow] Logging out...");
      await logout(); // Firebase logout
      await fetch("/auth/logout"); // destroy Remix session
      window.location.href = "/auth/logged-out";
    } catch (error) {
      console.error("[useLogoutFlow] Logout failed:", error);
    }
  };

  return { run };
}
