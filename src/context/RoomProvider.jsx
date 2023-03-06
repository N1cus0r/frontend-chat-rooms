import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const axios = useAxios();
  const navigate = useNavigate("");

  const createRoom = async (max_participants, setLoading) => {
    setLoading(true);
    await axios
      .post("/rooms/create-room", { max_participants })
      .then((res) => {
        if (res.status === 200) {
          const room = res.data;
          LocalStorageAPI.setLocalStorageRoom(room);
          navigate(`/${room.code}`);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };

  const joinRoom = async (code, setLoading, setErrorMessage) => {
    setLoading(true);
    await axios
      .put("/rooms/join-room", { code })
      .then((res) => {
        if (res.status === 200) {
          LocalStorageAPI.setLocalStorageRoom(res.data);
          return navigate(`/${code}`);
        }
      })
      .catch((e) => {
        setErrorMessage(e.response.data.detail);
      })
      .finally(() => setLoading(false));
  };

  const leaveRoom = async (code) => {
    await axios
      .put("/rooms/leave-room", { code })
      .then((res) => {
        LocalStorageAPI.delLocalStorageRoom();
        return navigate("/");
      })
      .catch((e) => {
        LocalStorageAPI.delLocalStorageUser();
        LocalStorageAPI.delLocalStorageToken();
        LocalStorageAPI.delLocalStorageRoom();
        return navigate("/login");
      });
  };

  const getRoomMessages = async (roomId, setMessages) => {
    await axios
      .get("/rooms/room-messages", { params: { room_id: roomId } })
      .then((res) => setMessages(res.data.reverse()));
  };

  const updateRoomAfterEvent = async (roomId, setMessages) => {
    await axios
      .get("/rooms/updated-room-data", { params: { room_id: roomId } })
      .then((res) => {
        const { messages, room } = res.data;
        setMessages(messages.reverse());
        LocalStorageAPI.setLocalStorageRoom(room);
      });
  };

  const hostLeftCallback = () => {
    LocalStorageAPI.delLocalStorageRoom();
    return navigate("/");
  };

  const checkUserInRoom = async () => {
    await axios.get("/rooms/user-in-room").then((res) => {
      if (res.status === 200 && res.data) {
        const room = res.data;
        LocalStorageAPI.setLocalStorageRoom(room);
        return navigate(`/${res.data.code}`);
      }
    });
  };

  const room = LocalStorageAPI.getLocalStorageRoom();

  const context = {
    room,
    createRoom,
    joinRoom,
    leaveRoom,
    getRoomMessages,
    updateRoomAfterEvent,
    hostLeftCallback,
    checkUserInRoom,
  };

  return (
    <RoomContext.Provider value={context}>{children}</RoomContext.Provider>
  );
};

export default RoomProvider;
