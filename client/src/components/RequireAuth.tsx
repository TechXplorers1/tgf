// client/src/components/RequireAuth.tsx

import type { ReactNode } from "react";
import { Redirect } from "wouter";

// ⬇️ If you already have useAuth in "@/lib/auth", you can use it here.
// import { useAuth } from "@/lib/auth";

type RequireAuthProps = {
  children: ReactNode;
};

/**
 * Simple route guard for admin routes.
 * Right now this is a very basic version: it just checks a token in localStorage.
 * You can replace this logic with your real AuthContext / useAuth hook.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  // ✅ Replace this block with your real auth logic later
  let isAuthed = false;

  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("adminToken");
    isAuthed = !!token;
  }

  // Not logged in → send to admin login page
  if (!isAuthed) {
    return <Redirect to="/admin/login" />;
  }

  // Logged in → show protected content
  return <>{children}</>;
}
