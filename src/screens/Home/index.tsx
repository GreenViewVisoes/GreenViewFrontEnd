import { Image, ScrollView, Text, View } from "react-native";

import icon from "@assets/icon.png";
import SearchInput from "@components/SearchInput";

export function Home() {
  return (
    <View className="flex-1 items-center justify-around bg-[#0C632E] gap-2">
      <View className="flex h-1/6 flex-row items-center justify-start w-full gap-3 p-5 ">
        <Image source={icon} />
        <Text className="text-background text-lg">
          Bem Vindo, <Text className="font-bold">Usuario</Text>
        </Text>
      </View>
      <ScrollView className="w-full h-5/6 bg-[#e5e5e5] rounded-t-[40] p-9">
        <SearchInput placeholder="Search" />
        <Text className="text-3xl text-[#252525] m-2">Histórico</Text>
        {/* mudar para flatlist para otimizar a renderização */}
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="gap-2"
        >
          <View className="flex-row gap-4">
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
          </View>
        </ScrollView>
        {/* mudar para flatlist para otimizar a renderização */}
        <Text className="text-3xl text-[#252525] m-2">Recentes</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="gap-2"
        >
          <View className="flex-row gap-4">
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
            <View className="bg-[#FFFFFF] w-44 h-44 rounded-xl"></View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
}
