// client/src/pages/admin-blog.tsx

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AdminBlog = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* If you have a separate admin header, you can replace Header here */}
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Admin – Blog</h1>
        <p className="text-slate-600 mb-4">
          This is the Admin Blog page. You can manage blog posts here.
        </p>

        {/* Later you can add: list of posts, create/edit forms, etc. */}
      </main>

      <Footer />
    </div>
  );
};

export default AdminBlog;
