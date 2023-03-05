import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const PrivateRoute = () => {
  const token = LocalStorageAPI.getLocalStorageToken();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
