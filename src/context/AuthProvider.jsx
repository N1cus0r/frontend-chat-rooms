import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import useAxiosLogin from "../hooks/useAxiosLogin";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const axios = useAxios();
  const axiosLogin = useAxiosLogin();

  const navigate = useNavigate();

  const setUserInfo = async (access_token) => {
    await axios
      .get("/users/me", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => LocalStorageAPI.setLocalStorageUser(res.data))
      .catch((e) => console.log(e));
  };

  const registerUser = async (
    username,
    email,
    password,
    setErrorMessage,
    setMessage,
    setLoading
  ) => {
    setLoading(true);

    await axios
      .post("/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 201) {
          setMessage("Account created implement email ! ");
        }
      })
      .catch((e) => {
        setErrorMessage("Email is already in use");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginUser = async (username, password, setErrorMessage, setLoading) => {
    setLoading(true);

    await axiosLogin
      .post("/auth/jwt/login", { username, password })
      .then((res) => {
        if (res.status === 200) {
          const { access_token } = res.data;
          LocalStorageAPI.setLocalStorageToken(access_token);
          setUserInfo(access_token);
          navigate("/");
        }
      })
      .catch((e) => {
        setErrorMessage("User account not found or inactive");
      })
      .finally(() => setLoading(false));
  };

  const logoutUser = async () => {
    const room = LocalStorageAPI.getLocalStorageRoom();

    if (room) {
      await axios.put("/rooms/leave-room", { code: room.code });
    }

    LocalStorageAPI.delLocalStorageRoom();
    LocalStorageAPI.delLocalStorageUser();
    return navigate("/login");
  };

  const user = LocalStorageAPI.getLocalStorageUser();

  const context = {
    user,
    registerUser,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
