import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { useState } from "react";

import loginLogo from "@assets/logo-login.png";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, set, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";

import Toast from "react-native-toast-message";

type formDataProps = {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup.string().required("Campo obrigatório"),
});

export function Login() {
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>({
    resolver: yupResolver(loginSchema),
  });

  const navigation = useNavigation();

  async function HandleLogin({ email, password }: formDataProps) {
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : "Erro ao fazer login";

      setLoading(false);

      Toast.show({
        type: "error",
        position: "top",
        text1: title,
        text2: isAppError ? "" : "Verifique suas credenciais e tente novamente",
        visibilityTime: 4000,
        autoHide: true,
      });
    }
  }

  function handleCadastro() {
    navigation.navigate("register");
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#E5E5E5] gap-2">
      <Image className="w-64 h-64" resizeMode="contain" source={loginLogo} />
      <View className="gap-1">
        <Text className="text-xl mb-2 text-[#404040]">Email</Text>

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={onChange}
              enterKeyHint="next"
              value={value}
              className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl mb-3"
            />
          )}
        />

        {errors.email && (
          <Text className="text-red-500 text-error">
            {errors.email?.message}
          </Text>
        )}
      </View>
      <View className="gap-1">
        <Text className="text-xl mb-2 text-[#404040]">Senha</Text>

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              onChangeText={onChange}
              enterKeyHint="next"
              value={value}
              secureTextEntry={true}
              className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl mb-3"
            />
          )}
        />

        {errors.password && (
          <Text className="text-red-500 text-error">
            {errors.password?.message}
          </Text>
        )}
      </View>

      <View className="gap-2">
        <Pressable
          onPress={handleSubmit(HandleLogin)}
          disabled={loading}
          className="w-72 h-14 items-center rounded-xl justify-center font-rubikRegular bg-main"
        >
          {loading ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <Text className="text-[#FFFFFF] text-lg">Entrar</Text>
          )}
        </Pressable>
        <Pressable
          className="w-72 h-14 items-center rounded-xl justify-center border-2 border-main"
          onPress={() => handleCadastro()}
        >
          <Text className="text-main text-lg font-rubikRegular">
            Me cadastrar
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
