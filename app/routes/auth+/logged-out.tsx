import { Link } from "@remix-run/react";
import { PageFrame } from "~/ui/layout/PageFrame";

export default function LogoutRoute() {
  return (
    <PageFrame>
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <h1 className="text-2xl font-semibold mb-2">You’ve been logged out</h1>
        <p className="text-gray-600">
          Thanks for visiting! You can close this window or
          <Link to="/auth/login" className="text-blue-500 hover:underline mx-1">
            log in
          </Link>
          again.
        </p>
      </div>
    </PageFrame>
  );
}
