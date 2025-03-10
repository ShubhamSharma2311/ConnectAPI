import axios from "axios";

 const axiosClient = axios.create({
  baseURL: "http://localhost:5000/app"})

  axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken"); // or "userToken" depending on the role
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  export default axiosClient;