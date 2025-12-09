
import { FormEvent, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";

const AdminLogin = () => {
  const { login } = useAuth();
  const [, navigate] = useLocation();

  // Prefill with demo credentials
  const [email, setEmail] = useState("test@mail.in");
  const [password, setPassword] = useState("1234567890");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    const success = await login(email, password);

    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid email or password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#2B1B15] overflow-hidden text-[#F5E9D5]">
      {/* Background dark brown gradient + soft glows */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#4A2F23]/90 via-[#3A251D] to-[#2B1B15]" />
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#8B6E56]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 w-80 h-80 rounded-full bg-[#7A4E3B]/30 blur-3xl" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 md:px-10 lg:px-16">
        <div className="w-full max-w-6xl grid gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-center">
          {/* LEFT – premium brand panel */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden md:block"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-[#4A2F23] via-[#7A4E3B] to-[#B08A6E] p-[1px] shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
              <div className="relative rounded-[1.45rem] bg-[#3A251D]/95 backdrop-blur-xl px-10 py-10 flex flex-col justify-between min-h-[360px] text-[#F5E9D5]">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="/logo.jpg"
                      alt="TGF Logo"
                      className="h-24 w-24 rounded-2xl shadow-lg shadow-black/40"
                    />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#D0B9A6]/90">
                        TGF • NGO Platform
                      </p>
                      <h1 className="text-3xl lg:text-4xl font-semibold">
                        TGF Admin
                      </h1>
                    </div>
                  </div>

                  <p className="max-w-md text-sm leading-relaxed text-[#EEDAC6]/90">
                    Centralized, secure workspace for program teams and
                    leadership to manage initiatives, respond to communities,
                    and publish impact stories with confidence.
                  </p>

                  <ul className="text-sm space-y-2 text-[#D7C0AE]">
                    <li>• Real-time community program oversight</li>
                    <li>• Streamlined outreach & volunteer coordination</li>
                    <li>• Editorial-grade impact storytelling tools</li>
                  </ul>
                </div>

                <div className="mt-6 flex items-center justify-between text-[11px] text-[#D0B9A6]/80">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Secure internal environment
                  </span>
                  <span className="rounded-full bg-[#2B1B15]/80 px-3 py-1 border border-[#8B6E56]/40">
                    Admin access only
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT – elevated login card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.06 }}
            className="w-full"
          >
            <div className="mx-auto w-full max-w-md">
              <div className="rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.6)] ring-1 ring-[#D0B9A6] px-8 py-9 text-[#4A2F23]">
                {/* Header */}
                <div className="mb-6 text-center">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#8B6E56]">
                    TGF • Admin Console
                  </p>
                  <h2 className="text-2xl font-semibold mt-2">Admin Login</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Use your authorized administrator credentials to access the
                    TGF dashboard.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 text-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="mt-2 w-full h-11 rounded-2xl bg-[#4A2F23] hover:bg-[#3A251D] text-white text-[13px] font-medium tracking-wide flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      "Authorising…"
                    ) : (
                      <>
                        Login to dashboard
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                {/* Demo credentials */}
                <div className="mt-6 border-t border-dashed border-[#E3D1C0] pt-4 text-center text-[11px] text-gray-600">
                  <p className="mb-1 font-semibold text-[#4A2F23]">
                    Demo admin credentials
                  </p>
                  <p>
                    Email:{" "}
                    <span className="font-medium text-[#4A2F23]">
                      test@mail.in
                    </span>
                  </p>
                  <p>
                    Password:{" "}
                    <span className="font-medium text-[#4A2F23]">
                      1234567890
                    </span>
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[10px] text-center text-[#D0B9A6]/80">
                © {new Date().getFullYear()} TGF. Secure internal admin
                environment.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
