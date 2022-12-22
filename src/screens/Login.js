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

import * as SQLite from "expo-sqlite";
import { UserContext } from "../../App";

const db = SQLite.openDatabase("users.db");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, setUserEmail } = useContext(UserContext);

  const handleSubmit = () => {
    if (validateEmail(email) && validatePassword(password)) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT password FROM users WHERE email = ?",
          [email],
          (txObj, resultSet) => {
            if (resultSet.rows._array[0]?.password === password) {
              setUserEmail(email);
              setLoggedIn(true);
              setEmail("");
              setPassword("");
            } else {
              alert("the email/password is invalid");
            }
          },
          (txObj, error) => console.log(error)
        );
      });
    }
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : "height"}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoWrapper}>
            <Logo />
          </View>
          <Text style={styles.title}>Log In To Woorkroom</Text>
          <Input
            label="Your email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Email"
            validateInput={validateEmail}
            keyboardType="email-address"
          />
          <View style={styles.passwordWrapper}>
            <Input
              label="Password"
              value={password}
              onChangeText={(value) => setPassword(value)}
              isPassword={true}
              placeholder="Password"
              validateInput={validatePassword}
            />
            <TouchableOpacity onPress={() => {}} style={styles.forgotPasswordLink}>
              <Text style={[styles.linkText1, { textAlign: "right" }]}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <Button text="Log in" onPress={handleSubmit} />
          </View>
          <TouchableOpacity style={styles.link} onPress={handleSignUp}>
            <Text style={styles.linkText1}>New User? </Text>
            <Text style={styles.linkText2}>Create Account</Text>
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
    marginBottom: 10,
  },
  forgotPasswordLink: {
    marginTop: 20,
  },
  buttonWrapper: {
    marginTop: 50,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 35,
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

export default Login;
