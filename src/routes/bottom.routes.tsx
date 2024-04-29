import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Camera } from "@screens/Camera/Index";
import { Home } from "@screens/Home";
import { Pests } from "@screens/Pests";
import { Profile } from "@screens/Profile";
import { Reports } from "@screens/Reports";

import HomeIcon from "@assets/home.svg";
import ReportsIcon from "@assets/report.svg";
import CameraIcon from "@assets/camera.svg";
import ProfileIcon from "@assets/profile.svg";
import PestsIcon from "@assets/pest.svg";

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
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon fill={color} width={24} height={24} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Screen
        name="reports"
        component={Reports}
        options={{
          tabBarIcon: ({ color }) => (
            <ReportsIcon fill={color} width={24} height={24} />
          ),
          tabBarLabel: "Relatórios",
        }}
      />
      <Screen
        name="camera"
        component={Camera}
        options={{
          tabBarIcon: ({ color }) => (
            <CameraIcon fill={color} width={24} height={24} />
          ),
          tabBarLabel: "Câmera",
        }}
      />
      <Screen
        name="pests"
        component={Pests}
        options={{
          tabBarIcon: ({ color }) => (
            <PestsIcon fill={color} width={24} height={24} />
          ),
          tabBarLabel: "Pragas",
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileIcon fill={color} width={24} height={24} />
          ),
          tabBarLabel: "Perfil",
        }}
      />
    </Navigator>
  );
}
