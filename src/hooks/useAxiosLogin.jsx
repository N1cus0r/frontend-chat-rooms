import axios from "axios";

const useAxiosLogin = () => {
  const baseURL = process.env.REACT_APP_SERVER_HOST_URL;
  const axiosLogin = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    withCredentials: true,
  });

  return axiosLogin;
};

export default useAxiosLogin;
