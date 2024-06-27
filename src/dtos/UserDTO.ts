import { PlantsDTO } from "./Plants.DTO";

export type AuthDTO = {
  id: number;
  nome: string;
  email: string;
  token_type: string;
  access_token: string;
  quantidade_consultas: number;
  plants_counts: PlantsDTO;
};
