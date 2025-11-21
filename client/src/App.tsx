// client/src/App.tsx

import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import ScrollToTopButton from "@/components/ScrollToTopButton";

import Home from "@/pages/home";
import About from "@/pages/about";
import Projects from "@/pages/projects";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import ProgramsPage from "@/pages/programs";        // 👈 new programs list page
import ProgramDetail from "@/pages/program-detail"; // 👈 single program detail

// Admin pages
import AdminDashboard from "@/pages/admin-dashboard";
import AdminLogin from "@/pages/admin-login";

// Auth
import { AuthProvider } from "@/lib/auth";
import { RequireAuth } from "@/components/RequireAuth";

// 👇 Scroll to top on every route change
function ScrollToTopOnRouteChange() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // change to "smooth" if you want animation
    });
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      {/* Auto scroll to top whenever path changes */}
      <ScrollToTopOnRouteChange />

      <Switch>
        {/* Public routes */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Projects} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={Contact} />

        {/* Programs list page */}
        <Route path="/programs" component={ProgramsPage} />

        {/* Single program detail page */}
        <Route path="/programs/:id">
          {(params) => <ProgramDetail id={params.id} />}
        </Route>

        {/* Public admin login */}
        <Route path="/admin/login" component={AdminLogin} />

        {/* PROTECTED: /admin -> dashboard, only if logged in */}
        <Route path="/admin">
          {() => (
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          )}
        </Route>

        {/* 404 */}
        <Route component={NotFound} />
      </Switch>

      <ScrollToTopButton />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
