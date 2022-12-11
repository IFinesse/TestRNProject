import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors } from "../consts";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";
import { isIos } from "../utils";
import { validateEmail, validatePassword } from "../utils";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    console.log("submit");
  };
  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  logoWrapper: {
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  title: {
    paddingVertical: 50,
    lineHeight: 36,
    fontFamily: "PoppinsMedium",
    fontSize: 24,
    color: colors.black,
    textAlign: "center",
  },
  forgotPasswordLink: {
    marginTop: isIos ? 0 : 15,
  },
  buttonWrapper: {
    marginTop: 50,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 25,
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
