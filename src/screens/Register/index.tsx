import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import * as yup from "yup";

import { api } from "src/service/api";

import { yupResolver } from "@hookform/resolvers/yup";

import loginLogo from "@assets/logo-login.png";
import { useForm, Controller } from "react-hook-form";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import Toast from "react-native-toast-message";

type formDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .required("Campo obrigatório"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não conferem")
    .required("Campo obrigatório"),
});

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();

  async function onSubmit({ name, email, password }: formDataProps) {
    try {
      const response = await api.post("/users", {
        nome: name,
        email,
        senha: password,
      });

      Toast.show({
        type: "success",
        text1: "Cadastro realizado com sucesso",
        text2: "Clique aqui para fazer login",
        onPress: () => navigation.navigate("login"),
      });
    } catch (err) {
      const isAppError = err instanceof AppError;
      Toast.show({
        type: "error",

        text1: isAppError ? err.message : "Erro no servidor",
        text2: isAppError
          ? "Verifique as informações e tente novamente"
          : "Tente novamente mais tarde",
      });
    }
  }

  function handleLogin() {
    navigation.goBack();
  }

  function HandleCadastro() {
    navigation.navigate("login");
  }

  return (
    <ScrollView
      className="flex-1 bg-[#E5E5E5]"
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="items-center justify-center gap-2 mb-6">
        <Image className="w-64 h-64" resizeMode="contain" source={loginLogo} />
        <View>
          <Text className="text-xl mb-2 text-[#404040]">Nome</Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                enterKeyHint="next"
                value={value}
                className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl mb-3"
              />
            )}
          />

          {errors.name && (
            <Text className="text-red-500 text-error">
              {errors.name?.message}
            </Text>
          )}
        </View>
        <View>
          <Text className="text-xl mb-2 text-[#404040]">Email</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                enterKeyHint="next"
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
        <View>
          <Text className="text-xl mb-2 text-[#404040]">Senha</Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                enterKeyHint="next"
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
        <View>
          <Text className="text-xl mb-2 text-[#404040]">Confirmar Senha</Text>

          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                secureTextEntry={true}
                enterKeyHint="done"
                className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl mb-3"
                onSubmitEditing={handleSubmit(onSubmit)}
                returnKeyLabel="send"
              />
            )}
          />

          {errors.passwordConfirm && (
            <Text className="text-red-500 text-error">
              {errors.passwordConfirm?.message}
            </Text>
          )}
        </View>
        <View className="gap-2">
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="w-72 h-14 items-center rounded-xl justify-center active:opacity-90 bg-[#0C632E]"
          >
            <Text className="text-[#FFFFFF] text-lg">Criar</Text>
          </Pressable>

          <Pressable
            className="w-72 h-14 items-center rounded-xl justify-center border-2 active:opacity-90 border-main"
            onPress={() => handleLogin()}
          >
            <Text className="text-main text-lg ">Voltar para login</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
