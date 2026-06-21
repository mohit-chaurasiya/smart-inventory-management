import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import MobileBottomNav from "./MobileBottomNav";

const Layout = ({ children }) => {
  return (
    <div
      className="
        flex
        min-h-screen

        bg-linear-to-br

        from-slate-100
        via-slate-50
        to-slate-200

        dark:from-[#020617]
        dark:via-[#030712]
        dark:to-[#111827]
      "
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 p-6 lg:p-8 pb-32 lg:pb-8">{children}</main>

        <MobileBottomNav />
      </div>
    </div>
  );
};

export default Layout;
