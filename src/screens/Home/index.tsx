import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";

import icon from "@assets/icon.png";
import SearchInput from "@components/SearchInput";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@hooks/useAuth";
import { CardHome } from "@components/CardHome";
import { api } from "src/service/api";
import { AppError } from "@utils/AppError";
import Toast from "react-native-toast-message";
import { useCallback, useState } from "react";
import { ConsultasDTO } from "@dtos/Consultas.DTO";

export function Home() {
  const { AuthUser, signOut } = useAuth();
  const [consultas, setConsultas] = useState<ConsultasDTO[]>([]);
  const [recentes, setRecentes] = useState<ConsultasDTO[]>([]);

  function pestOfPlants(doenca: string): string {
    const translations: Record<string, string> = {
      "potassium deficiency": "Deficiência de potássio",
      "downey mildew": "Míldio",
      ferrugen: "Ferrugem",
      Healty: "Saudável",
    };
    return translations[doenca] || "";
  }

  async function fetchConsultas() {
    try {
      const response = await api.get("/consultas");

      const countConsultas = response.data.length;

      response.data.forEach((consultasSeparandoPorDoença: ConsultasDTO) => {
        const pest = consultasSeparandoPorDoença.consulta.parametrosretornoia;

        switch (pest) {
          case "potassium deficiency":
            AuthUser.plants_counts.potassio++;
            break;
          case "downey mildew":
            AuthUser.plants_counts.mildio++;
            break;
          case "ferrugen":
            AuthUser.plants_counts.ferrugem++;
            break;
          case "Healty":
            AuthUser.plants_counts.Saudável++;
            break;
        }

        if (pest)
          consultasSeparandoPorDoença.consulta.parametrosretornoia =
            pestOfPlants(pest);
      });

      AuthUser.quantidade_consultas = countConsultas;

      setConsultas(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Erro ao buscar consultas";

      Toast.show({
        type: "error",
        text1: title,
        text2: isAppError ? "" : "Tente novamente mais tarde",
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchConsultas();
    }, [])
  );

  function handlePressCard(novaConsulta: ConsultasDTO) {
    const indice = recentes.findIndex(
      (c) => c.consulta.idconsulta === novaConsulta.consulta.idconsulta
    );

    if (indice !== -1) {
      // Se o objeto existe, remove-o do array e o adiciona na primeira posição
      const atualizadosRecentes = [
        novaConsulta,
        ...recentes.slice(0, indice),
        ...recentes.slice(indice + 1),
      ];

      setRecentes(atualizadosRecentes);
    } else {
      // Se o objeto não existe, adiciona-o ao final do array
      setRecentes([...recentes, novaConsulta]);
    }
  }

  function handleListEmpty() {
    return (
      <View className="flex justify-center items-center min-w-full h-full">
        <Text className="text-base">Nenhum dado encontrado</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-around bg-[#0C632E] gap-2">
      <View className="flex flex-row items-center w-full gap-3 mb-2">
        <View className="flex flex-row items-center gap-3">
          <Image source={icon} />
          <Text className="text-background text-lg">
            Bem Vindo,{" "}
            <Text className="font-rubikBold capitalize">{AuthUser.nome}</Text>
          </Text>
        </View>
        <View className="items-center justify-end flex-1 gap-3">
          <Pressable className="h-auto w-auto" onPress={signOut}>
            <FontAwesome6
              name={"right-from-bracket"}
              size={20}
              color="#e5e5e5"
            />
          </Pressable>
        </View>
      </View>
      <ScrollView className="w-full h-5/6 bg-[#e5e5e5] rounded-t-[40] p-9">
        <SearchInput placeholder="Search" />
        <Text className="text-3xl text-[#252525] m-2 font-rubikRegular mt-6">
          Histórico
        </Text>
        {/* mudar para flatlist para otimizar a renderização */}
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          centerContent={true}
          ListEmptyComponent={handleListEmpty}
          data={consultas}
          keyExtractor={(item) => item.consulta.idconsulta.toString()}
          className="flex h-44 rounded-md"
          renderItem={({ item }) => (
            <CardHome
              data={item.consulta.data_criacao
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
              cultura={"Soja"}
              img={item.image.imagem_com_fundo}
              onPress={() => handlePressCard(item)}
              consultasData={item}
            />
          )}
        />
        {/* mudar para flatlist para otimizar a renderização */}
        <Text className="text-3xl text-[#252525] m-2 font-rubikRegular mt-6">
          Recentes
        </Text>
        <FlatList
          horizontal={true}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.consulta.idconsulta.toString()}
          data={recentes ? recentes : []}
          className="flex h-44 rounded-md "
          renderItem={({ item }) => (
            <CardHome
              data={item.consulta.data_criacao
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
              cultura={"Soja"}
              img={item.image.imagem_com_fundo}
              consultasData={item}
            />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
