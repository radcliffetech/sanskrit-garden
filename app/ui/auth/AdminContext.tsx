import { createContext, useContext } from "react";

import type { Feature } from "~/types";

export type AdminContextType = {
  userEmail: string;
  features: Feature[];
};

const defaultValue: AdminContextType = {
  userEmail: "",
  features: [],
};

const AdminContext = createContext<AdminContextType>(defaultValue);

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
}

export function AdminProvider({
  value,
  children,
}: {
  value: AdminContextType;
  children: React.ReactNode;
}) {
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
