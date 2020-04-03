import axios from "axios";

const instance = axios.create({
  baseURL: "https://ibu-backend.herokuapp.com/api/v1"
});

instance.interceptors.request.use(config => {
  config.headers.common["Authorization"] = "Bearer " + window.localStorage.getItem("token");
  return config;
});
export default instance;
