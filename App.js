import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import RootNavigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
  });

  return fontsLoaded ? (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  ) : null;
}
// {/* <Text style={}>121212122sdsdsds</Text> */}
