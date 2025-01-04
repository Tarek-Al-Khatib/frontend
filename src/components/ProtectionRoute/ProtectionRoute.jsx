import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectionRoute = () => {
  const { userId } = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectionRoute;
