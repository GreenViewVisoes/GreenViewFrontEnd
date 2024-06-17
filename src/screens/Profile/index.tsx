import IconProfile from "@components/IconProfile";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { api } from "src/service/api";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import Divider from "@components/Divider";

type formDataProps = {
  name: string;
  email: string;
  senha?: string;
  confirmarSenha?: string;
};

const changeProfile = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  senha: yup.string().optional(),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não conferem")
    .when("senha", {
      is: (value: string | undefined) => !!value,
      then: (schema) =>
        schema
          .required("Você deve confirmar a senha")
          .oneOf([yup.ref("senha")], "As senhas não conferem"),
      otherwise: (schema) => schema.optional(),
    }),
});

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);

  const { AuthUser, updateUserProfile } = useAuth();

  const [photo, setPhoto] = useState<string>("https://via.placeholder.com/150");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formDataProps>({
    defaultValues: {
      name: AuthUser.nome,
      email: AuthUser.email,
    },
    resolver: yupResolver(changeProfile),
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        base64: true,
        aspect: [4, 4],
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        setPhoto(photoSelected.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onSubmit({ name, email, senha }: formDataProps) {
    try {
      setIsUpdating(true);
      const userUpdated = AuthUser;

      userUpdated.nome = name;

      await api.put("/users", {
        nome: name,
        // email,
        senha: senha || undefined,
      });

      await updateUserProfile(userUpdated);

      Toast.show({
        type: "success",
        text1: "Informações alteradas com sucesso",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao alterar suas informações",
        text2: "Tente novamente mais tarde",
      });
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-background"
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView className="justify-center items-center gap-2 mb-6 mt-16">
        <IconProfile url={photo} />
        <Pressable onPress={handleUserPhotoSelect}>
          <Text className="text-base font-bold text-white mb-6  text-main">
            Editar foto de perfil
          </Text>
        </Pressable>
        <View className="gap-5">
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
                  onSubmitEditing={handleSubmit(onSubmit)}
                  className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl"
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
                  enterKeyHint="next"
                  value={value}
                  readOnly
                  onSubmitEditing={handleSubmit(onSubmit)}
                  className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl"
                />
              )}
            />
          </View>
          <View>
            <Divider classStyle="m-2 " />
          </View>

          <View>
            <Text className="text-xl mb-2 text-[#474747]">Senha</Text>
            <Controller
              control={control}
              name="senha"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl"
                />
              )}
            />

            {errors.senha && (
              <Text className="text-red-500 text-error">
                {errors.senha?.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-xl mb-2 text-[#474747]">Confirmar Senha</Text>
            <Controller
              control={control}
              name="confirmarSenha"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  className="bg-[#FFFFFF] text-lg h-14 w-72 p-3 rounded-xl"
                />
              )}
            />

            {errors.confirmarSenha && (
              <Text className="text-red-500 text-error">
                {errors.confirmarSenha?.message}
              </Text>
            )}
          </View>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isUpdating}
            className="w-72 h-14 items-center rounded-xl justify-center active:opacity-90 bg-[#0C632E]"
          >
            {isUpdating ? (
              <ActivityIndicator size="large" color="#FFFFFF" />
            ) : (
              <Text className="text-[#FFFFFF] text-lg">Editar</Text>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
