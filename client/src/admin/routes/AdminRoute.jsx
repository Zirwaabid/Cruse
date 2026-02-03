import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading, role } = useAuth();

  console.log("AdminRoute role:", role);

  // 🔐 WAIT until role is resolved
 if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;
if (role !== "admin") return <Navigate to="/" replace />;

  

  return children;
};

export default AdminRoute;
