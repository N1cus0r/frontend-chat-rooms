import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const useAxios = () => {
  const navigate = useNavigate();

  const accessToken = LocalStorageAPI.getLocalStorageToken();

  const baseURL = process.env.REACT_APP_SERVER_HOST_URL;
  const axiosApi = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  useEffect(() => {
    const requestInterceptor = axiosApi.interceptors.request.use(
      async (config) => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      }
    );

    const responseInterceptor = axiosApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevConfig = error?.config;
        if (error.response.status === 401 && !prevConfig?.sent) {
          LocalStorageAPI.delLocalStorageUser();
          LocalStorageAPI.delLocalStorageToken();
          LocalStorageAPI.delLocalStorageRoom();
          return navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosApi.interceptors.request.eject(requestInterceptor);
      axiosApi.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken]);

  return axiosApi;
};

export default useAxios;
