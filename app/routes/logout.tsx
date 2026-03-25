import { getAuth, signOut } from "firebase/auth";

import { app } from "~/core/lib/firebase/firebase.client";
import { redirect } from "react-router";
import { useEffect } from "react";

export const loader = async () => {
  return redirect("/auth/logout");
};
