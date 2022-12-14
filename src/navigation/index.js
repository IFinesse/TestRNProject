import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import EditScreen from "../screens/Edit";

const Stack = createNativeStackNavigator();

export default RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Edit"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
