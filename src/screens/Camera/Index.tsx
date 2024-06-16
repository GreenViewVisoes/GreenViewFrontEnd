import { Pressable, Text, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

export function Camera() {
  async function handleImageSearch() {
    await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      aspect: [4, 4],
    });
  }

  return <View className="flex justify-center items-center h-full"></View>;
}
