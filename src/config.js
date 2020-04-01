import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1"
});

instance.interceptors.request.use(config => {
  config.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("token");
  return config;
});
export default instance;
