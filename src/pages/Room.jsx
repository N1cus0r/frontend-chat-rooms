import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import RoomContent from "../features/rooms/components/RoomContent";
import useAuth from "../hooks/useAuth";
import useRoom from "../hooks/useRoom";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const Room = () => {
  const { user } = useAuth();
  const socket = useRef(null);

  const [room, setRoom] = useState(LocalStorageAPI.getLocalStorageRoom());
  const { getRoomMessages, updateRoomAfterEvent, hostLeftCallback } = useRoom();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const bottomMessageRef = useRef();

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    await socket.current.emit("chat_message", {
      text: message,
      room_id: room._id,
      room_code: room.code,
      user_id: user.id,
      user_username: user.username,
    });
    setMessage("");
  };

  const emitJoinRoomEvent = async () => {
    await socket.current.emit("join_room", {
      code: room.code,
    });
    console.log("connected");
  };

  const emitLeaveRoomEvent = async () => {
    setLoading(true);
    await socket.current.emit("leave_room", {
      code: room.code,
      host_id: room.host_id,
      user_id: user.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    bottomMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  useEffect(() => {
    getRoomMessages(room._id, setMessages);

    socket.current = io.connect(process.env.REACT_APP_WEBSOCKET_HOST_URL, {
      transports: ["websocket"],
    });

    socket.current.on("connect", emitJoinRoomEvent);

    socket.current.on("join_room", async () => {
      await updateRoomAfterEvent(room._id, setMessages);
    });

    socket.current.on("user_left", async () => {
      await updateRoomAfterEvent(room._id, setMessages);
    });

    socket.current.on("host_left", async () => {
      await hostLeftCallback();
    });

    socket.current.on("chat_message", (message) => {
      setMessages((prevValue) => [...prevValue, message]);
    });

    const LocalStorageRoomUpdate = () => {
      setRoom(LocalStorageAPI.getLocalStorageRoom());
    };

    window.addEventListener("roomUpdate", LocalStorageRoomUpdate);

    return () => {
      window.removeEventListener("roomUpdate", LocalStorageRoomUpdate);
      socket.current.disconnect();
    };
  }, []);

  return (
    <RoomContent
      room={room}
      messages={messages}
      message={message}
      loading={loading}
      bottomMessageRef={bottomMessageRef}
      setMessage={setMessage}
      sendMessage={sendMessage}
      emitLeaveRoomEvent={emitLeaveRoomEvent}
    />
  );
};

export default Room;
