import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Package,
  ShieldCheck,
  Brain,
} from "lucide-react";

import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      login(data.user, data.token);

      toast.success("Login Successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      min-h-screen

      flex
      items-center
      justify-center

      p-4

      bg-gradient-to-br

      from-slate-100
      via-emerald-50
      to-cyan-100

      dark:from-[#020617]
      dark:via-[#0F172A]
      dark:to-[#111827]
    "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="
        w-full
        max-w-6xl

        grid
        lg:grid-cols-2

        overflow-hidden

        rounded-[32px]

        bg-white/70
        dark:bg-slate-900/70

        backdrop-blur-2xl

        border
        border-white/20

        shadow-2xl
      "
      >
        {/* Left Section */}

        <div
          className="
          hidden lg:flex

          flex-col
          justify-center

          p-12

          bg-gradient-to-br

          from-emerald-500
          to-teal-600

          text-white
        "
        >
          <h1 className="text-5xl font-extrabold">
            Smart Inventory AI
          </h1>

          <p className="mt-6 text-lg text-white/90">
            Manage your inventory smarter
            with AI-powered automation and
            analytics.
          </p>

          <div className="space-y-6 mt-12">

            <div className="flex items-center gap-4">
              <Package size={28} />
              <span className="text-lg">
                Smart Inventory Management
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Brain size={28} />
              <span className="text-lg">
                AI Invoice Processing
              </span>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck size={28} />
              <span className="text-lg">
                Secure & Reliable Platform
              </span>
            </div>

          </div>
        </div>

        {/* Right Section */}

        <div className="p-8 md:p-12">

          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Welcome Back 👋
            </h2>

            <p className="mt-3 text-slate-500">
              Login to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 mt-10"
          >

            {/* Email */}

            <div>
              <label className="font-medium">
                Email
              </label>

              <div
                className="
                mt-2

                flex
                items-center

                rounded-2xl

                bg-slate-100
                dark:bg-slate-800

                px-4
              "
              >
                <Mail
                  size={20}
                  className="text-slate-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"

                  value={formData.email}
                  onChange={handleChange}

                  required

                  className="
                  w-full

                  bg-transparent

                  p-4

                  outline-none
                "
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="font-medium">
                Password
              </label>

              <div
                className="
                mt-2

                flex
                items-center

                rounded-2xl

                bg-slate-100
                dark:bg-slate-800

                px-4
              "
              >
                <Lock
                  size={20}
                  className="text-slate-500"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  name="password"

                  placeholder="Enter password"

                  value={formData.password}
                  onChange={handleChange}

                  required

                  className="
                  w-full

                  bg-transparent

                  p-4

                  outline-none
                "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember */}

            <div className="flex justify-between">
              <label className="flex gap-2">
                <input type="checkbox" />

                <span className="text-sm">
                  Remember Me
                </span>
              </label>

              <button
                type="button"
                className="
                text-sm

                text-emerald-500
              "
              >
                Forgot Password?
              </button>
            </div>

            {/* Button */}

            <button
              disabled={loading}
              className="
              w-full

              py-4

              rounded-2xl

              font-semibold
              text-white

              bg-linear-to-r

              from-emerald-500
              to-teal-500

              hover:scale-[1.02]

              transition-all
            "
            >
              {loading
                ? "Please Wait..."
                : "Login"}
            </button>
          </form>

          <p className="text-center mt-8">
            Don't have an account?

            <Link
              to="/register"
              className="
              ml-2

              text-emerald-500
              font-semibold
            "
            >
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;