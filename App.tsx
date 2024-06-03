import {
  useFonts,
  Rubik_400Regular,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

import { AuthContextProvider } from "@contexts/AuthContext";

import { Routes } from "./src/routes";
import { Loading } from "@components/Loading";

import Toast from "react-native-toast-message";

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  return (
    <AuthContextProvider>
      {!fontsLoaded ? (
        <Loading />
      ) : (
        <>
          <Routes />
          <Toast />
        </>
      )}
    </AuthContextProvider>
  );
}
