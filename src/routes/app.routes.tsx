import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "@screens/Login";
import React from "react";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
