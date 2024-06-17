import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { CameraPage } from "@screens/Camera/Index";
import { Home } from "@screens/Home";
import { Profile } from "@screens/Profile";
import { Reports } from "@screens/Reports";

import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";

type AppRoutes = {
  home: undefined;
  reports: undefined;
  camera: undefined;
  profile: undefined;
  pests: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function BottomRoutes() {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#0C632E",
        tabBarInactiveTintColor: "#A5A5A5",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 80,
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6Icon name={"house"} color={color} size={30} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Screen
        name="reports"
        component={Reports}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6Icon name={"chart-simple"} color={color} size={30} />
          ),
          tabBarLabel: "Relatórios",
        }}
      />
      <Screen
        name="camera"
        component={CameraPage}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6Icon name={"camera"} color={color} size={30} />
          ),
          tabBarLabel: "Câmera",
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6Icon name={"user"} color={color} size={30} solid />
          ),
          tabBarLabel: "Perfil",
        }}
      />
    </Navigator>
  );
}
