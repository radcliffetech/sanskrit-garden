import {
  User,
  getAuth,
  inMemoryPersistence,
  onIdTokenChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { app } from "~/lib/firebase.client";
import { useSyncAuthToken } from "~/hooks/useSyncAuthToken";

type AuthContextType = {
  user: User | null;
  emailLogin: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail: string | null;
  loading: boolean;
  destroySession: () => Promise<void>;
};

const defaultAuthContext: AuthContextType = {
  user: null,
  emailLogin: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  isAdmin: false,
  userEmail: null,
  loading: true,
  destroySession: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useSyncAuthToken(); // 🔁 sync ID token periodically

  useEffect(() => {
    if (typeof window === "undefined") return;

    const auth = getAuth(app);

    return onIdTokenChanged(auth, async (user) => {
      setUser(user ?? null);
      setUserEmail(user?.email ?? null);
      if (user) {
        const idToken = await user.getIdToken(true); // force refresh
        await fetch("/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        });

        const tokenResult = await user.getIdTokenResult();
        const adminClaim = tokenResult.claims.admin === true;
        setIsAdmin(adminClaim);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
  }, []);

  const emailLogin = async (email: string, password: string) => {
    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    const auth = getAuth(app);

    // Replace persistent session with in-memory session before signing out
    await setPersistence(auth, inMemoryPersistence);

    await new Promise<void>((resolve) => {
      const unsubscribe = onIdTokenChanged(auth, (user) => {
        if (!user) {
          unsubscribe();
          resolve();
        }
      });
      signOut(auth);
    });
  };

  const destroySession = async () => {
    setUser(null);
    setUserEmail(null);
    setIsAdmin(false);
    setLoading(false);
    const auth = getAuth(app);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        emailLogin,
        logout,
        isAuthenticated: !!user,
        isAdmin,
        userEmail,
        loading,
        destroySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
