import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/" replace />; 
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default PrivateRoute;
