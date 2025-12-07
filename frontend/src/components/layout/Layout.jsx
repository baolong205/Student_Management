import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./SideBar";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster position="top-right" />

      {/* Header */}
      <Header />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 bg-muted/30 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
