import { useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { useFonts } from "expo-font";
import RootNavigation from "./src/navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
  });

  return fontsLoaded ? <RootNavigation /> : null;
}
// {/* <Text style={}>121212122sdsdsds</Text> */}
