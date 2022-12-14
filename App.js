import { useState, useEffect, createContext } from "react";
import { useFonts } from "expo-font";
import RootNavigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import FlashMessage from "react-native-flash-message";

const db = SQLite.openDatabase("users.db");

export const UserContext = createContext();

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [fontsLoaded] = useFonts({
    PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
    PoppinsLight: require("./assets/fonts/Poppins-Light.ttf"),
  });

  useEffect(() => {
    db.transaction((tx) => {
      // tx.executeSql("drop table if exists users", []);
      tx.executeSql(
        "create table if not exists users (id integer primary key autoincrement, phone text, name text, email text, password text, position text, skype text, image text);"
      );
    });
  }, []);

  return fontsLoaded ? (
    <UserContext.Provider value={{ isLoggedIn, setLoggedIn, userEmail, setUserEmail }}>
      <SafeAreaProvider>
        <RootNavigation isLoggedIn={isLoggedIn} />
      </SafeAreaProvider>
      <FlashMessage position="top" />
    </UserContext.Provider>
  ) : null;
}
