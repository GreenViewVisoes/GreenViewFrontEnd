import { AuthDTO } from "@dtos/UserDTO";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

import {
  storageAuthGet,
  storageAuthSave,
  storageAuthRemove,
} from "@storage/storageAuthUser";
import { api } from "src/service/api";
import { ConsultasDTO } from "@dtos/Consultas.DTO";
import {
  storageConsultasGet,
  storageConsultasSave,
  storageCosultasRemove,
} from "@storage/storageConsultas";

export type AuthContextDataProps = {
  AuthUser: AuthDTO;
  updateUserProfile: (userUpdated: AuthDTO) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  saveConsultas: (consultas: ConsultasDTO[]) => Promise<void>;
  getConsultas: () => Promise<ConsultasDTO[]>;
  storageCosultasRemove: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [AuthUser, setAuthUser] = useState<AuthDTO>({} as AuthDTO);

  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function userAuthUpdate(data: any, email: string) {
    api.defaults.headers.common[
      "Authorization"
    ] = `${data.token_type} ${data.access_token}`;

    setAuthUser({
      email: data.email,
      id: data.id,
      nome: data.nome,
      access_token: data.access_token,
      token_type: data.token_type,
    });
  }

  async function signIn(email: string, password: string) {
    const data = new URLSearchParams();
    data.append("username", email);
    data.append("password", password);

    try {
      const response = await axios.post(
        "http://192.168.100.20:8000/users/login",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.data) {
        setIsLoadingUserStorageData(true);

        await storageAuthSave({
          email: response.data.email,
          id: response.data.id,
          nome: response.data.nome,
          access_token: response.data.access_token,
          token_type: response.data.token_type,
        });

        userAuthUpdate(response.data, email);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);

      setAuthUser({} as AuthDTO);
      await storageAuthRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadAuthUser() {
    try {
      setIsLoadingUserStorageData(true);

      const auth = await storageAuthGet();

      if (auth.access_token) {
        userAuthUpdate(auth, auth.email);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: AuthDTO) {
    try {
      setAuthUser(userUpdated);
      await storageAuthSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function saveConsultas(consultas: ConsultasDTO[]) {
    await storageConsultasSave(consultas);
  }

  async function getConsultas() {
    const consultas = await storageConsultasGet();

    return consultas;
  }

  async function removeConsultas() {
    await storageCosultasRemove();
  }

  useEffect(() => {
    loadAuthUser();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        AuthUser,
        updateUserProfile,
        signIn,
        signOut,
        isLoadingUserStorageData,
        getConsultas,
        saveConsultas,
        storageCosultasRemove,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
