import { useAuth } from "~/ui/auth/AuthProvider";

export function AdminOnlyGate({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isAdmin } = useAuth();
  return isAdmin ? <>{children}</> : <>{fallback}</>;
}

export function AuthenticatedGate({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <>{fallback}</>;
}

export function UnauthenticatedGate({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <>{fallback}</>;
}
