import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const PublicRoutes = () => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <div className="center">
        <div className="loader"></div>
      </div>
    );
  }

  return isAuth ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoutes;
