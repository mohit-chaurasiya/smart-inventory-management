import {
  LayoutDashboard,
  Package,
  Users,
  ArrowLeftRight,
  ShoppingCart,
  CreditCard,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      path: "/products",
      icon: Package,
    },
    {
      title: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: ArrowLeftRight,
    },
    {
      title: "Sales",
      path: "/sales",
      icon: ShoppingCart,
    },
    {
      title: "Payments",
      path: "/payments",
      icon: CreditCard,
    },
    {
      title: "Invoices",
      path: "/invoices",
      icon: FileText,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <aside
      className="
        hidden lg:flex

        w-72
        h-screen

        sticky
        top-0

        flex-col
        justify-between

        bg-white/80
        dark:bg-[#0F172A]/95

        backdrop-blur-xl

        border-r
        border-slate-200
        dark:border-slate-800

        p-6
      "
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="mb-12">
          <h1
            className="
              text-3xl
              font-extrabold

              bg-linear-to-r
              from-emerald-500
              via-teal-500
              to-cyan-500

              bg-clip-text
              text-transparent
            "
          >
            Smart Inventory AI
          </h1>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Manage your business smarter
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-4

                  px-5
                  py-2

                  rounded-2xl

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        bg-linear-to-r
                        from-emerald-500
                        to-teal-500

                        text-white

                        shadow-lg
                        shadow-emerald-500/20
                      `
                      : `
                        text-slate-700
                        dark:text-slate-300

                        hover:bg-slate-100
                        dark:hover:bg-slate-800

                        hover:translate-x-1
                      `
                  }
                  `
                }
              >
                <Icon size={22} />

                <span className="font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div>
        {/* User Card */}
        <div
          className="
            p-4
            rounded-2xl

            bg-slate-100
            dark:bg-slate-800

            mb-4
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-12 h-12

                rounded-full

                bg-linear-to-r
                from-emerald-500
                to-teal-500

                flex
                items-center
                justify-center

                text-white
                font-bold
              "
            >
              M
            </div>

            <div>
              <h3 className="font-semibold">Mohit</h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Owner
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          className="
            w-full

            flex
            items-center
            gap-3

            px-5
            py-4

            rounded-2xl

            text-red-500

            hover:bg-red-50
            dark:hover:bg-red-950/30

            transition-all
          "
          onClick={handleLogout}
        >
          <LogOut size={22} />

          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
