// client/src/lib/auth.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Simple demo login – replace with real API later if you want
  const login = async (email: string, password: string): Promise<boolean> => {
    // ✅ demo credentials – same as on your login screen
    const isValid =
      email === "test@mail.in" && password === "1234567890";

    if (!isValid) {
      return false;
    }

    // Save any token/jwt here – using a dummy value for now
    localStorage.setItem("admin_token", "demo_admin_token");
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
