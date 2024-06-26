import { ConsultasDTO } from "@dtos/Consultas.DTO";
import { CONSULTAS_STORAGE } from "./StorageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storageConsultasSave(consultas: ConsultasDTO[]) {
  await AsyncStorage.setItem(CONSULTAS_STORAGE, JSON.stringify(consultas));
}

export async function storageConsultasGet() {
  const storage = await AsyncStorage.getItem(CONSULTAS_STORAGE);

  const consultas: ConsultasDTO[] = storage ? JSON.parse(storage) : [];

  return consultas;
}

export async function storageCosultasRemove() {
  await AsyncStorage.removeItem(CONSULTAS_STORAGE);
}
