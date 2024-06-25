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

import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@hooks/useAuth";
import { CardHome } from "@components/CardHome";
import { useForegroundPermissions } from "expo-location";
import { useEffect } from "react";

export function Home() {
  const { AuthUser, signOut } = useAuth();
  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();

  useEffect(() => {
    requestLocationForegroundPermission();
  }, []);

  if (!locationForegroundPermission?.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-[#0C632E]">
        <View className="flex flex-col items-center justify-center gap-3">
          <Text className="text-background text-lg text-center">
            Precisamos de sua permissão para acessar a localização
          </Text>
          <Pressable
            className="bg-[#059A3F] w-1/2 h-12 rounded-md items-center justify-center"
            onPress={requestLocationForegroundPermission}
          >
            <Text className="text-background text-lg">Conceder Permissão</Text>
          </Pressable>
        </View>
      </SafeAreaView>
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
          <Pressable className="h-auto w-auto " onPress={signOut}>
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
          data={[
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
          ]}
          renderItem={({ item }) => (
            <CardHome data={item.data} cultura={item.cultura} />
          )}
        ></FlatList>
        {/* mudar para flatlist para otimizar a renderização */}
        <Text className="text-3xl text-[#252525] m-2 font-rubikRegular mt-6">
          Recentes
        </Text>
        <FlatList
          horizontal={true}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          data={[
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
            {
              data: "12/09/2021",
              cultura: "Milho",
            },
          ]}
          renderItem={({ item }) => (
            <CardHome data={item.data} cultura={item.cultura} />
          )}
        ></FlatList>
      </ScrollView>
    </SafeAreaView>
  );
}
