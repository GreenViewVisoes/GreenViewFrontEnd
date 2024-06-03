import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthDTO } from "@dtos/UserDTO";
import { USER_STORAGE } from "./StorageConfig";

export async function storageAuthSave(auth: AuthDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(auth));
}

export async function storageAuthGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE);

  const user: AuthDTO = storage ? JSON.parse(storage) : {};

  return user;
}

export async function storageAuthRemove() {
  await AsyncStorage.removeItem(USER_STORAGE);
}
