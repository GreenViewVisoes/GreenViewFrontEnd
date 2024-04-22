import { View, ActivityIndicator } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 items-center justify-center bg-[#E5E5E5] gap-2">
      <ActivityIndicator size="large" color="#0C632E" />
    </View>
  );
}
