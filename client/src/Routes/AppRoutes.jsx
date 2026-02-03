import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRoute from '../admin/routes/AdminRoute'
import AdminLayout from "../admin/layout/AdminLayout";

import Dashboard from "../admin/pages/Dashboard";
import Products from "../admin/pages/Products";
import Orders from "../admin/pages/Orders";
import Users from "../admin/pages/Users";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
      <Route index element={<Dashboard />} />
  <Route path="/admin/products" element={<Products />} />
  <Route path="/admin/orders" element={<Orders />} />
  <Route path="/admin/users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
