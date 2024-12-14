import axios from "axios";
import { getToken} from "./localStorage";


export const request = axios.create({
  baseURL: "http://localhost:8081/identity",
  headers: {
    "Content-Type": "application/json",
  },
});

export const requestPrivate = axios.create({
  baseURL: "http://localhost:8081/identity",
  headers: {
    "Content-Type": "application/json",
  },
});


// Thêm Interceptor để đính kèm token vào mọi request
requestPrivate.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Thêm Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



