import { ConsultasDTO } from "@dtos/Consultas.DTO";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { storageAuthRemove } from "@storage/storageAuthUser";
import { blobToDataURL } from "blob-util";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { AppNavigatorRoutesProps } from "src/routes/bottom.routes";
import { api } from "src/service/api";

type CardHomeProps = {
  data: string;
  cultura: string;
  img?: string;
  consultasData: ConsultasDTO;
};

export function CardHome({ data, cultura, img, consultasData }: CardHomeProps) {
  const { saveConsultas, getConsultas, storageCosultasRemove } = useAuth();

  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function fetchUri() {
    try {
      const response = await api.get(`/images/get-image/${img}`, {
        responseType: "blob",
      });

      const imageConverted = await blobToDataURL(response.data);

      setImage(imageConverted);
    } catch (error) {
      setError(true);
    }
  }

  fetchUri();

  function handleOpenConsultas(consultasData: ConsultasDTO) {
    navigation.navigate("details", consultasData);
  }

  return (
    <Pressable
      className="bg-[#FFFFFF] w-44 h-44 rounded-xl mr-3 flex items-end justify-center"
      onPress={() => handleOpenConsultas(consultasData)}
    >
      {!error ? (
        <Image
          source={
            image ? { uri: image } : { uri: "https://via.placeholder.com/150" }
          }
          className="flex-1 w-full h-full rounded-t-xl"
          resizeMode="cover"
        />
      ) : (
        <View className="bg-[#000000] w-full justify-center items-center rounded-t-xl flex-1">
          <Text className="text-[#FFFFFF]">Imagem não encontrada</Text>
        </View>
      )}
      <View className="flex w-full items-center justify-center">
        <Text className="text-base">Data: {data}</Text>
        <Text className="text-base">Cultura: {cultura}</Text>
      </View>
    </Pressable>
  );
}
