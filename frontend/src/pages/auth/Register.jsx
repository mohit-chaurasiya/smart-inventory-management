import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { User, Mail, Lock, Eye, EyeOff, Package } from "lucide-react";

import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      };

      const data = await registerUser(payload);

      toast.success(data.message || "Registration Successful");

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
        w-full
        max-w-md

        p-8

        rounded-[32px]

        bg-white/80
        dark:bg-slate-900/80

        backdrop-blur-2xl

        border
        border-white/20

        shadow-2xl
      "
      >
        {/* Logo */}

        <div className="text-center mb-8">
          <div
            className="
            w-16 h-16

            mx-auto

            rounded-2xl

            bg-gradient-to-r
            from-emerald-500
            to-teal-500

            flex
            items-center
            justify-center
          "
          >
            <Package className="text-white" size={30} />
          </div>

          <h1 className="text-3xl font-bold mt-5">Create Account</h1>

          <p className="text-slate-500 mt-2">
            Start managing inventory smarter
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}

          <div
            className="
            flex
            items-center

            rounded-2xl

            bg-slate-100
            dark:bg-slate-800

            px-4
          "
          >
            <User size={20} className="text-slate-500" />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="
              w-full

              p-4

              bg-transparent

              outline-none
            "
            />
          </div>

          {/* Email */}

          <div
            className="
            flex
            items-center

            rounded-2xl

            bg-slate-100
            dark:bg-slate-800

            px-4
          "
          >
            <Mail size={20} className="text-slate-500" />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="
              w-full

              p-4

              bg-transparent

              outline-none
            "
            />
          </div>

          {/* Password */}

          <div
            className="
            flex
            items-center

            rounded-2xl

            bg-slate-100
            dark:bg-slate-800

            px-4
          "
          >
            <Lock size={20} className="text-slate-500" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="
              w-full

              p-4

              bg-transparent

              outline-none
            "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}

          <div
            className="
            flex
            items-center

            rounded-2xl

            bg-slate-100
            dark:bg-slate-800

            px-4
          "
          >
            <Lock size={20} className="text-slate-500" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="
              w-full

              p-4

              bg-transparent

              outline-none
            "
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Button */}

          <button
            disabled={loading}
            className="
            w-full

            py-4

            rounded-2xl

            text-white
            font-semibold

            bg-gradient-to-r

            from-emerald-500
            to-teal-500

            hover:scale-[1.02]

            transition-all
          "
          >
            {loading ? "Please Wait..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-8">
          Already have an account?
          <Link
            to="/login"
            className="
            ml-2

            text-emerald-500
            font-semibold
          "
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
