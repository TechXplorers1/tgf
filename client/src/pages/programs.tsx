// client/src/pages/programs.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProgramsSection from "@/components/ProgramsSection";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <ProgramsSection />
      </main>
      <Footer />
    </div>
  );
}
