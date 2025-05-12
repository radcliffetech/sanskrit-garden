import { Outlet, useLoaderData } from "@remix-run/react";

import { AdminProvider } from "~/ui/auth/AdminContext";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { requireAdminUser } from "~/lib/firebase/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireAdminUser(request); // 🔐 Protects all nested routes, before client code is run

  return { email: user?.email, features: [] };
};

export default function AdminLayout() {
  const { email, features } = useLoaderData<typeof loader>();
  const contextType = {
    userEmail: email || "",
    features,
  };
  return (
    <AdminProvider value={contextType}>
      <Outlet />
    </AdminProvider>
  );
}
