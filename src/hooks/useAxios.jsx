import axios from "axios";
import { useEffect } from "react";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";

const useAxios = () => {
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
      async (response) => {
        console.log("response interceptor");
        return response;
      },
      async (error) => {
        console.log("response interceptor");
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
