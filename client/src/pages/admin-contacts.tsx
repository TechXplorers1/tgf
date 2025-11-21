// client/src/pages/admin-contacts.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminContacts = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Admin – Contacts</h1>
        <p className="text-slate-600 mb-4">
          This is the Admin Contacts page. You can view and manage contact form
          submissions here.
        </p>
      </main>

      <Footer />
    </div>
  );
};

export default AdminContacts;
