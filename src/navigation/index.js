import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/SignUp";
import EditScreen from "../screens/Edit";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F5F5F5",
  },
};

const Stack = createNativeStackNavigator();

export default RootNavigation = ({ isLoggedIn }) => {
  return (
    <NavigationContainer theme={MyTheme}>
      {!isLoggedIn ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Edit"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
