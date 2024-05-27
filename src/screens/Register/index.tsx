import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import axios from "axios";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import loginLogo from "@assets/logo-login.png";
import { useForm, Controller } from "react-hook-form";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

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

  const onSubmit = (data: formDataProps) => {
    const { name, email, password } = data;

    console.log(data);
    axios
      .post("http://192.168.100.20:8000/users/", {
        nome: name,
        email,
        senha: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleLogin() {
    navigation.goBack();
  }

  function HandleCadastro() {
    navigation.navigate("login");
  }

  return (
    <ScrollView className="flex-1 bg-[#E5E5E5] ">
      <SafeAreaView className="items-center justify-center gap-2 mb-6">
        <Image className="w-64 h-64" resizeMode="contain" source={loginLogo} />
        <View>
          <Text className="text-xl text-[#404040]">Nome</Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                placeholder="Seu Nome"
                enterKeyHint="next"
                value={value}
                className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl mb-3"
              />
            )}
          />

          {errors.name && (
            <Text className="text-red-500 text-main">
              {errors.name?.message}
            </Text>
          )}
        </View>
        <View>
          <Text className="text-xl text-[#404040]">Email</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder="exemplo@gmail.com"
                enterKeyHint="next"
                className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl mb-3"
              />
            )}
          />

          {errors.email && (
            <Text className="text-red-500 text-main">
              {errors.email?.message}
            </Text>
          )}
        </View>
        <View>
          <Text className="text-xl text-[#404040]">Senha</Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder="Senha"
                secureTextEntry={true}
                enterKeyHint="next"
                className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl mb-3"
              />
            )}
          />

          {errors.password && (
            <Text className="text-red-500 text-main">
              {errors.password?.message}
            </Text>
          )}
        </View>
        <View>
          <Text className="text-xl text-[#404040]">Confirmar Senha</Text>

          <Controller
            control={control}
            name="passwordConfirm"
            render={({ field: { onChange, value } }) => (
              <TextInput
                onChangeText={onChange}
                value={value}
                placeholder="Confirme a senha"
                secureTextEntry={true}
                enterKeyHint="done"
                className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl mb-3"
                onSubmitEditing={handleSubmit(onSubmit)}
                returnKeyLabel="send"
              />
            )}
          />

          {errors.passwordConfirm && (
            <Text className="text-red-500 text-main">
              {errors.passwordConfirm?.message}
            </Text>
          )}
        </View>
        <View className="gap-2">
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="w-72 h-14 items-center rounded-xl justify-center active:opacity-90 bg-[#0C632E]"
          >
            <Text className="text-[#FFFFFF] text-lg">Criar e Acessar</Text>
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
