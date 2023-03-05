import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRoom from "../hooks/useRoom";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const CheckUserRoom = () => {
  const { room } = useRoom();
  const { user } = useAuth();

  if (room?.participants_ids.includes(user.id)) {
    return <Navigate to={`/${room.code}`} />;
  } else {
    LocalStorageAPI.delLocalStorageRoom();
    return <Outlet />;
  }

  // return room ? <Navigate to={`/${room.code}`} /> : <Outlet />;
};

export default CheckUserRoom;
