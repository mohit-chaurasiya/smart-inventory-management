import { useState } from "react";
import { Moon, Sun, Bell, Search, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header
      className="
        sticky
        top-0
        z-30

        h-20

        px-6 lg:px-10

        flex
        items-center
        justify-between

        bg-white/80
        dark:bg-slate-900/80

        backdrop-blur-xl

        border-b
        border-slate-200
        dark:border-slate-800
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>

          <p className="text-sm text-slate-500">Welcome back, Mohit 👋</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 lg:gap-5">
        {/* Search */}
        <div
          className="
            hidden md:flex

            items-center

            gap-3

            px-4
            py-3

            rounded-2xl

            bg-slate-100
            dark:bg-slate-800
          "
        >
          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
            className="
              bg-transparent
              outline-none

              w-48

              placeholder:text-slate-500
            "
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            p-3

            rounded-2xl

            bg-slate-100
            dark:bg-slate-800

            hover:scale-105

            transition-all
          "
        >
          {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {/* Notification */}
        <button
          className="
            relative

            p-3

            rounded-2xl

            bg-slate-100
            dark:bg-slate-800

            hover:scale-105

            transition-all
          "
        >
          <Bell size={22} />

          <span
            className="
              absolute

              -top-1
              -right-1

              w-5
              h-5

              rounded-full

              bg-red-500

              text-white
              text-xs

              flex
              items-center
              justify-center
            "
          >
            3
          </span>
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="
              flex
              items-center

              gap-3

              p-2

              rounded-2xl

              hover:bg-slate-100
              dark:hover:bg-slate-800

              transition-all
            "
          >
            <div
              className="
                w-12
                h-12

                rounded-full

                bg-gradient-to-r
                from-emerald-500
                to-teal-500

                text-white

                flex
                items-center
                justify-center

                font-bold
              "
            >
              M
            </div>

            <div className="hidden md:block text-left">
              <h3 className="font-semibold">Mohit</h3>

              <p className="text-sm text-slate-500">Owner</p>
            </div>

            <ChevronDown size={18} />
          </button>

          {/* Dropdown */}
          {showProfileMenu && (
            <div
              className="
                absolute
                right-0
                top-16

                w-56

                rounded-2xl

                bg-white
                dark:bg-slate-900

                border
                border-slate-200
                dark:border-slate-800

                shadow-xl

                overflow-hidden
              "
            >
              <button
                className="
                  w-full

                  text-left

                  px-5
                  py-4

                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                "
              >
                Profile
              </button>

              <button
                className="
                  w-full

                  text-left

                  px-5
                  py-4

                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                "
              >
                Settings
              </button>

              <button
                className="
                  w-full

                  text-left

                  px-5
                  py-4

                  text-red-500

                  hover:bg-red-50
                  dark:hover:bg-red-950/30

                "
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
