import { Loading } from "@components/Loading";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

export function CameraPage() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <Loading />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
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

  function handleTakePicture() {
    console.log("Take picture");
  }

  return (
    <View className="flex-1">
      <CameraView facing={"back"} className="h-full w-full" />

      <View className="absolute bottom-0 left-0 right-0 p-4 flex-row justify-center gap-4">
        <Pressable
          className="h-20 w-20 flex justify-center items-center bg-[#000000C7] rounded-full"
          onPress={() => handleTakePicture()}
        >
          <FontAwesome6Icon name={"camera"} size={35} color={"#FFFFFF"} />
        </Pressable>
      </View>
    </View>
  );
}
