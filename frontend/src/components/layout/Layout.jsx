import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./SideBar";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster position="top-right" />

      {/* Header */}
      <Header />

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 bg-muted/30 overflow-auto">
          {children}
        </main>
      </div>

      {/* Footer đặt đúng vị trí */}
      <Footer />
    </div>
  );
}
