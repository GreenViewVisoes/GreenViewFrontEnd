import {
  useFonts,
  Rubik_400Regular,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

import { Routes } from "./src/routes";
import { Loading } from "@components/Loading";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });

  return !fontsLoaded ? <Loading /> : <Routes />;
}
