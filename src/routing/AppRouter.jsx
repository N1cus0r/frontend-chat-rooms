import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutBase from "../layouts/LayoutBase";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Room from "../pages/Room";
import CheckUserRoom from "./CheckUserRoom";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<LayoutBase />}>
        <Route element={<PrivateRoute />}>
          <Route element={<CheckUserRoom />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/:roomCode" element={<Room />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
