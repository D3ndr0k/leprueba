import React from "react";

import "./App.css";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PrivateRoutes = () => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }
  return !isAuth ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoutes;
