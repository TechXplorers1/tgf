// client/src/components/RequireAuth.tsx

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";

type RequireAuthProps = {
  children: ReactNode;
};

/**
 * Route guard for admin routes.
 * Uses AuthContext (useAuth) + localStorage-backed state from AuthProvider.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // If not authenticated, send to admin login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, navigate]);

  // While not authenticated / redirecting, render nothing (or a loader)
  if (!isAuthenticated) {
    return null;
  }

  // Logged in → show protected content
  return <>{children}</>;
}
