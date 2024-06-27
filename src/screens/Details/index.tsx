import { useAuth } from "@hooks/useAuth";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { AppNavigatorRoutesProps } from "src/routes/bottom.routes";
import { api } from "src/service/api";
import { blobToDataURL } from "blob-util";
import { ConsultasDTO } from "@dtos/Consultas.DTO";

export function Details() {
  const [isLoading, setIsLoading] = useState(false);

  const [imageUrls, setImageUrls] = useState({
    withBackground: "https://via.placeholder.com/200",
    green: "https://via.placeholder.com/200",
    yellow: "https://via.placeholder.com/200",
    brown: "https://via.placeholder.com/200",
  });

  const { AuthUser } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();

  const { consulta, image } = route.params as ConsultasDTO;

  function handleButtonClick() {
    navigation.navigate("home");
  }

  function pestOfPlants(doenca: string): string {
    const translations: Record<string, string> = {
      "potassium deficiency": "Deficiência de potássio",
      "downey mildew": "Míldio",
      ferrugen: "Ferrugem",
      Healty: "Saudável",
    };
    return translations[doenca] || "";
  }

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const [
          imagemComFundo,
          imagemMarcaraVerde,
          imagemMascaraAmarela,
          imagemMascaraMarrom,
        ] = await Promise.all([
          api.get(`/images/get-image/${image.imagem_com_fundo}`, {
            responseType: "blob",
          }),
          api.get(`/images/get-image/${image.imagem_mascara_verde}`, {
            responseType: "blob",
          }),
          api.get(`/images/get-image/${image.imagem_mascara_amarela}`, {
            responseType: "blob",
          }),
          api.get(`/images/get-image/${image.imagem_mascara_marrom}`, {
            responseType: "blob",
          }),
        ]);

        const withBackground = await blobToDataURL(imagemComFundo.data);
        const green = await blobToDataURL(imagemMarcaraVerde.data);
        const yellow = await blobToDataURL(imagemMascaraAmarela.data);
        const brown = await blobToDataURL(imagemMascaraMarrom.data);

        setImageUrls({
          withBackground,
          green,
          yellow,
          brown,
        });
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();

    return () => {
      // Revoke the object URLs to avoid memory leaks
      URL.revokeObjectURL(imageUrls.withBackground);
      URL.revokeObjectURL(imageUrls.green);
      URL.revokeObjectURL(imageUrls.yellow);
      URL.revokeObjectURL(imageUrls.brown);
    };
  }, [image]);

  return (
    <ScrollView>
      <SafeAreaView className="flexjustify-center items-center bg-background p-10 min-h-screens">
        <View className="mt-12 mb-12">
          <Text className="items-center justify-center text-lg font-bold">
            Consultor: <Text className="text-main">{AuthUser.nome}</Text>
          </Text>
          <Text className=" items-center justify-center text-base">
            Problema: {consulta.parametrosretornoia}
          </Text>
          <Text className=" items-center justify-center text-base">
            Tipo do Cultivo: Soja
          </Text>
          <Text className=" items-center justify-center text-base">
            Data:{" "}
            {consulta.data_criacao.split("T")[0].split("-").reverse().join("/")}
          </Text>
        </View>
        <View className="flex">
          <View className="flex-row">
            <View className="flex items-center justify-center">
              <Text>Imagem Original</Text>
              <Image
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
                className="rounded-lg w-36 h-36 m-3"
                source={{ uri: imageUrls.withBackground }}
              />
            </View>
            <View className="flex items-center justify-center">
              <Text>Área Verde</Text>
              <Image
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
                source={{ uri: imageUrls.green }}
                className="rounded-lg w-36 h-36 m-3"
              />
            </View>
          </View>
          <View className="flex-row">
            <View className="flex items-center justify-center">
              <Text>Área Amarela</Text>
              <Image
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
                className="rounded-lg w-36 h-36 m-3"
                source={{ uri: imageUrls.yellow }}
              />
            </View>
            <View className="flex items-center justify-center">
              <Text>Área Marrom</Text>
              <Image
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
                className="rounded-lg w-36 h-36 m-3"
                source={{ uri: imageUrls.brown }}
              />
            </View>
          </View>
        </View>

        <View className="flex items-start justify-start w-full gap-2">
          <Text className="text-base font-bold">Grau de Confiança:</Text>
          <Text className="text-base font-bold text-main">
            {consulta.grauconfianca}
          </Text>
          <Text className="text-base font-bold">Área total em pixels:</Text>
          <Text className="text-base font-bold text-main">
            {image.area_total}
          </Text>

          <Text className="text-base font-bold">Percentual de Área Verde:</Text>
          <Text className="text-base font-bold text-main">
            {image.percent_green_mask}%
          </Text>

          <Text className="text-base font-bold">
            Percentual de Área Amarela:
          </Text>
          <Text className="text-base font-bold text-main">
            {image.percent_yellow_mask}%
          </Text>

          <Text className="text-base font-bold">
            Percentual de Área Marrom:
          </Text>
          <Text className="text-base font-bold text-main">
            {image.percent_brown_mask}%
          </Text>
        </View>
        <Pressable
          className="w-72 h-14 mt-6 items-center rounded-xl justify-center active:opacity-90 bg-[#0C632E]"
          onPress={handleButtonClick}
        >
          <Text className="text-base font-bold text-[#FFFF]">Voltar</Text>
        </Pressable>
      </SafeAreaView>
    </ScrollView>
  );
}
