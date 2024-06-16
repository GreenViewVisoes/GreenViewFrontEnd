import axios from "axios";

import { AppError } from "@utils/AppError";

const api = axios.create({
  baseURL: "http://192.168.100.20:8000",
});

api.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  }
);

export { api };
