import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { View } from "react-native";
import { BottomRoutes } from "./bottom.routes";

export function Routes() {
  return (
    <View className="flex-1 bg-background">
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </View>
  );
}
