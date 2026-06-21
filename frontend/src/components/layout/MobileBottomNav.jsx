import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  ArrowLeftRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const MobileBottomNav = () => {
  const navItems = [
    {
      title: "Home",
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
      title: "Sales",
      path: "/sales",
      icon: ShoppingCart,
    },
    {
      title: "Inventory",
      path: "/inventory",
      icon: ArrowLeftRight,
    },
  ];

  return (
    <div
      className="
        lg:hidden

        fixed
        bottom-4
        left-1/2
        -translate-x-1/2

        z-50

        w-[95%]
        max-w-md

        bg-white/80
        dark:bg-slate-900/90

        backdrop-blur-2xl

        border
        border-slate-200
        dark:border-slate-800

        rounded-3xl

        shadow-2xl
        shadow-black/10

        px-2
        py-3
      "
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `
                relative

                flex
                flex-col
                items-center
                justify-center

                gap-1

                px-4
                py-2

                rounded-2xl

                transition-all
                duration-300

                ${
                  isActive
                    ? `
                      text-white

                      bg-linear-to-r
                      from-emerald-500
                      to-teal-500

                      shadow-lg
                      shadow-emerald-500/20
                    `
                    : `
                      text-slate-500
                      dark:text-slate-400
                    `
                }
              `
              }
            >
              <Icon size={22} />

              <span className="text-[11px] font-medium">{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
