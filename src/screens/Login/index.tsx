import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import loginLogo from "@assets/logo-login.png";

import { useNavigation } from "@react-navigation/native";

export function Login() {
  const navigation = useNavigation();

  function HandleLogin() {
    navigation.navigate("home");
  }

  function handleCadastro() {
    navigation.navigate("register");
  }

  return (
    <View className="flex-1 items-center justify-center bg-[#E5E5E5] gap-2">
      <Image className="w-64 h-64" resizeMode="contain" source={loginLogo} />
      <View className="gap-1">
        <Text className="text-xl text-[#404040]">Email</Text>
        <TextInput
          placeholder="Seu Email"
          enterKeyHint="next"
          className="bg-[#FFFFFF] h-14 w-72 p-3 rounded-xl"
        ></TextInput>
      </View>
      <View className="gap-1">
        <Text className="text-xl text-[#404040]">Senha</Text>
        <TextInput
          placeholder="Sua Senha"
          className="bg-[#FFFFFF] h-14 w-72 p-3 rounded-xl"
          secureTextEntry={true}
        ></TextInput>
      </View>

      <View className="gap-2">
        <Pressable onPress={() => handleCadastro()}>
          <Text className="text-[#404040] text-lg">Esqueceu sua senha?</Text>
        </Pressable>
        <TouchableOpacity
          onPress={() => HandleLogin()}
          className="w-72 h-14 items-center rounded-xl justify-center bg-[#0C632E]"
        >
          <Text className="text-[#FFFFFF] text-lg">Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
