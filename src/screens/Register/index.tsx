import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import loginLogo from "@assets/logo-login.png";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();

  function handleLogin() {
    navigation.goBack();
  }

  function HandleCadastro() {
    navigation.navigate("login");
  }

  return (
    <ScrollView className="flex-1 bg-[#E5E5E5] ">
      <SafeAreaView className="items-center justify-center gap-2">
        <Image className="w-64 h-64" resizeMode="contain" source={loginLogo} />
        <View className="gap-1">
          <Text className="text-xl text-[#404040]">Nome</Text>
          <TextInput
            placeholder="Seu Nome"
            enterKeyHint="next"
            className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl"
          ></TextInput>
        </View>
        <View className="gap-1">
          <Text className="text-xl text-[#404040]">Email</Text>
          <TextInput
            placeholder="exemplo@gmail.com"
            enterKeyHint="next"
            className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl"
          ></TextInput>
        </View>
        <View className="gap-1">
          <Text className="text-xl text-[#404040]">Senha</Text>
          <TextInput
            placeholder="Senha"
            secureTextEntry={true}
            enterKeyHint="next"
            className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl"
          ></TextInput>
        </View>
        <View className="gap-1">
          <Text className="text-xl text-[#404040]">Confirmar Senha</Text>
          <TextInput
            placeholder="Confirme a senha"
            secureTextEntry={true}
            enterKeyHint="done"
            className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl"
          ></TextInput>
        </View>
        <View className="gap-2">
          <Pressable onPress={() => handleLogin()}>
            <Text className="text-[#404040] text-lg">Já tem login?</Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => HandleCadastro()}
            className="w-72 h-14 items-center rounded-xl justify-center bg-[#0C632E]"
          >
            <Text className="text-[#FFFFFF] text-lg">Entrar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
