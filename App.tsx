import {
  useFonts,
  Rubik_400Regular,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";
import React from "react";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

import { Image, Text, TextInput, View } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  return (
    <View className="flex-1 items-center justify-center bg-[#E5E5E5] gap-2">
      <View className="gap-2">
        <Text className="text-xl">Email</Text>
        <TextInput
          placeholder="Seu Email"
          enterKeyHint="next"
          className="bg-[#FFFFFF] h-14 w-72 p-3 rounded-lg"
        ></TextInput>
      </View>

      <View className="gap-2">
        <Text className="text-xl">Senha</Text>
        <TextInput
          placeholder="Sua Senha"
          className="bg-[#FFFFFF] h-14 w-72 p-3 rounded-lg"
        ></TextInput>
      </View>
    </View>
  );
}
