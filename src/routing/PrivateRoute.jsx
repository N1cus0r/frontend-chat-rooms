import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { CookieAPI } from "../utils/CookieAPI";

const PrivateRoute = () => {
  const token = CookieAPI.getToken();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
