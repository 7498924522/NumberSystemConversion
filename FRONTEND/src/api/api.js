import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090", // your backend URL
});

export default api;
