import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectionRoute = () => {
  const data = localStorage.getItem("userId");

  if (!data) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectionRoute;
