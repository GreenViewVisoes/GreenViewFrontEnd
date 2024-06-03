import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { View } from "react-native";
import { BottomRoutes } from "./bottom.routes";

import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export function Routes() {
  const { AuthUser, isLoadingUserStorageData } = useAuth();

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-background">
      <NavigationContainer>
        {AuthUser.access_token ? <BottomRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
