import axios, { AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";

type SignOut = () => void;

type APIInstance = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: "https://d791-2804-1e68-c609-ca73-c48-f97-8717-361c.ngrok-free.app",
}) as APIInstance;

api.registerInterceptTokenManager = (singOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => {
      return response;
    },
    (requestError) => {
      if (requestError?.response?.status === 401) {
        if (requestError.response.data.detail === "Not authenticated") {
          singOut();
        }
        singOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
