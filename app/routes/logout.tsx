import { getAuth, signOut } from "firebase/auth";

import { app } from "~/lib/firebase/firebase.client";
import { redirect } from "@remix-run/node";
import { useEffect } from "react";

export const loader = async () => {
  return redirect("/auth/logout");
};
