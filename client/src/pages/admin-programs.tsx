// client/src/pages/admin-programs.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminPrograms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* If you have a separate admin header, import & use that instead */}
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Admin – Programs</h1>
        <p className="text-slate-600">
          This is the Admin Programs page. You can list, create and edit programs here.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPrograms;
