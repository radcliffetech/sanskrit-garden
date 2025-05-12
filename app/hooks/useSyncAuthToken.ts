import { getFreshIdToken } from "~/lib/firebase/firebase.client";
import { useEffect } from "react";

export function useSyncAuthToken() {
  useEffect(() => {
    const syncToken = async () => {
      let token = await getFreshIdToken();
      if (!token) return;

      const sendToken = async (tokenToSend: string) => {
        const response = await fetch("/auth/set-token", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenToSend}`,
          },
        });
        return response;
      };

      let response = await sendToken(token);

      if (response.status === 401) {
        // Token might have just expired — try again
        token = await getFreshIdToken(); // this forces another refresh
        if (token) {
          await sendToken(token);
        }
      }
    };

    // Run once on mount
    syncToken();

    // refresh every 50 minutes to prevent expiration
    const interval = setInterval(syncToken, 50 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
}
