import { Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ProtectedRoute from "./ProtectedRoute";
import Products from "../pages/products/Products";
import Customers from "../pages/customers/Customers";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Future Routes */}

      {/* */}

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Layout>
              <Products />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <Layout>
              <Customers />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
