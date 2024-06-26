export type ConsultasDTO = {
  consulta: {
    iduser: number;
    idpest: number;
    idimage: number;
    idconsulta: number;
    grauconfianca: number;
    parametrosretornoia: string;
    localizacao: string;
    data_criacao: string;
  };
  image: {
    id_image: number;
    data_envio: string;
    imagem_com_fundo: string;
    imagem_mascara_amarela: string;
    imagem_mascara_marrom: string;
    imagem_mascara_verde: string;
    imagem_sem_fundo: string;
    area_total: number;
    percent_brown_mask: number;
    percent_green_mask: number;
    percent_yellow_mask: number;
    status: string;
  };
};
