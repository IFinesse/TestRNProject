import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useContext } from "react";
import { colors } from "../consts";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import { isIos, validateEmail, validatePassword } from "../utils";
import SMSInput from "../components/SMSInput";
import PhoneInput from "../components/PhoneInput";

import * as SQLite from "expo-sqlite";

import { UserContext } from "../../App";

const db = SQLite.openDatabase("users.db");

const checkExistingUser = async (email) => {
  let exists = null;
  await db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (txObj, resultSet) => {
        exists = resultSet.rows._array.length > 0;
      },
      (txObj, error) => console.log(error)
    );
  });
  return exists;
};

const SignUp = ({ navigation }) => {
  const [phone, setPhone] = useState(["+1", ""]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setLoggedIn, setUserEmail } = useContext(UserContext);

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const validateName = () => {
    return name;
  };

  const validateConfirmPassword = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async () => {
    if (
      name &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword)
    ) {
      if (await checkExistingUser(email)) {
        alert(email + " is already registered");
      } else {
        createUser();
      }
    }
  };

  const createUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (phone, name, email, password) values (?, ?, ?, ?)",
        [phone[0] + phone[1], name, email, password],
        (txObj, resultSet) => {
          setUserEmail(email);
          setLoggedIn(true);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : "height"}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <Logo />
          </View>
          <Text style={styles.title}>Sign Up To Woorkroom</Text>
          <View style={styles.phoneWrapper}>
            <PhoneInput onSubmit={(code) => setPhone(code)} />
          </View>
          <SMSInput />
          <Input
            label="Your name"
            value={name}
            onChangeText={(value) => setName(value)}
            placeholder="Name"
            validateInput={validateName}
          />
          <Input
            label="Your email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Email"
            validateInput={validateEmail}
            keyboardType="email-address"
          />
          <Input
            label="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            isPassword={true}
            placeholder="Password"
            validateInput={validatePassword}
          />
          <Input
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            isConfirmPassword={true}
            placeholder="Password"
            validateInput={validateConfirmPassword}
          />
          <View style={styles.buttonWrapper}>
            <Button text="Next" onPress={handleSubmit} />
          </View>
          <TouchableOpacity style={styles.link} onPress={handleLogin}>
            <Text style={styles.linkText1}>Have Account? </Text>
            <Text style={styles.linkText2}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    marginVertical: 50,
  },
  logoWrapper: {
    alignItems: "center",
    height: 200,
  },
  title: {
    lineHeight: 36,
    fontFamily: "PoppinsMedium",
    fontSize: 24,
    color: colors.black,
    textAlign: "center",
  },
  phoneWrapper: {
    marginTop: 50,
  },
  buttonWrapper: {
    marginTop: 50,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
    marginBottom: 10,
  },
  linkText1: {
    fontFamily: "PoppinsLight",
    fontSize: 14,
    color: colors.grey,
  },
  linkText2: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    color: colors.orange,
  },
});

export default SignUp;
