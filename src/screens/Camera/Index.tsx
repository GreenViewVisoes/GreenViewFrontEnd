import { useState, useEffect, useRef } from "react";
import { Loading } from "@components/Loading";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Pressable, Text, View } from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import * as ImagePicker from "expo-image-picker";
import { api } from "src/service/api";
import {
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  useForegroundPermissions,
  LocationObject,
} from "expo-location";
import Toast from "react-native-toast-message";
import { AppError } from "@utils/AppError";
import { useNavigation } from "@react-navigation/native";
import { DetailsProps } from "@screens/Details";
import { AppNavigatorRoutesProps } from "src/routes/bottom.routes";

export function CameraPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [locationForegroundPermission, requestLocationForegroundPermission] =
    useForegroundPermissions();

  const cameraRef = useRef<CameraView>(null);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [location, setLocation] = useState<LocationObject | null>(null);

  useEffect(() => {
    if (locationForegroundPermission) {
      let subscription: LocationSubscription;

      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
        },
        (location) => {
          console.log(location);
          setLocation(location);
        }
      ).then((response) => (subscription = response));

      return () => subscription?.remove();
    }
  }, [locationForegroundPermission]);

  if (!permission) {
    return <Loading />;
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Pressable onPress={requestPermission} className="bg-main w-1/5 ">
          <Text style={{ textAlign: "center" }}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  async function handleTakePicture() {
    if (cameraRef.current) {
      try {
        setIsLoading(true);
        let options = { quality: 0.5 };
        let data = await cameraRef.current.takePictureAsync(options);

        const fileExtension = data?.uri.split(".").pop();

        const fileName =
          `${new Date().getTime()}.${fileExtension}`.toLowerCase();

        const photoFile = {
          name: fileName,
          uri: data?.uri,
          type: `image/${fileExtension}`,
        } as any;

        const form = new FormData();
        form.append("img_bytes", photoFile);

        // if (location) {
        //   form.append("location", JSON.stringify(location));
        // }

        const response = await api.post("/images", form, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const { image, consulta } = response.data as DetailsProps;

        navigation.navigate("details", {
          image: image,
          consulta: consulta,
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const isAppError = error instanceof AppError;

        Toast.show({
          type: "error",

          text1: isAppError ? error.message : "Erro no servidor",
          text2: isAppError
            ? "Verifique as informações e tente novamente"
            : "Tente novamente mais tarde",
        });
      }
    }
  }

  async function handleGaleryPicture() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.6,
        aspect: [4, 4],
      });

      if (photoSelected.canceled) {
        return;
      }
      setIsLoading(true);
      const uri = photoSelected.assets[0].uri;
      const type = photoSelected.assets[0].type;
      const fileExtension = uri.split(".").pop();

      const form = new FormData();

      const photoFile = {
        name: `${new Date().getTime()}.${fileExtension}`.toLowerCase(),
        uri: uri,
        type: `${type}/${fileExtension}`,
      } as any;

      form.append("img_bytes", photoFile);

      if (location) {
        form.append("location", JSON.stringify(location));
      }

      const response = await api.post("/images", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { image, consulta } = response.data as DetailsProps;

      navigation.navigate("details", {
        image: image,
        consulta: consulta,
      });

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;

      Toast.show({
        type: "error",

        text1: isAppError ? error.message : "Erro no servidor",
        text2: isAppError
          ? "Verifique as informações e tente novamente"
          : "Tente novamente mais tarde",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1">
      <CameraView facing={"back"} ref={cameraRef} className="h-full w-full" />

      <View className="absolute bottom-0 left-0 right-0 p-4 flex-row justify-center gap-4">
        <Pressable
          className="h-16 w-16 flex justify-center items-center bg-[#252525] rounded-full"
          onPress={handleTakePicture}
        >
          <FontAwesome6Icon name={"camera"} size={30} color={"#FFFFFF"} />
        </Pressable>
        <Pressable
          className="h-16 w-16 flex justify-center items-center bg-[#252525] rounded-full"
          onPress={handleGaleryPicture}
        >
          <FontAwesome6Icon name={"image"} size={30} color={"#FFFFFF"} />
        </Pressable>
      </View>
    </View>
  );
}
