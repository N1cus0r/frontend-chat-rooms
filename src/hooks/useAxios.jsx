import axios from "axios";

const useAxios = () => {
  const baseURL = process.env.REACT_APP_SERVER_HOST_URL;
  const axiosApi = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return axiosApi;
};

export default useAxios;
