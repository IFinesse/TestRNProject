import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { colors } from "../consts";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        <View style={styles.logoWrapper}>
          <Logo />
        </View>
        <Text style={styles.title}>Log In To Woorkroom</Text>
        <Input label="Your email" placeholder="Email" />
        <View style={styles.passwordWrapper}>
          <Input label="Password" isPassword={true} placeholder="Password" />
          <TouchableOpacity onPress={() => {}} style={styles.forgotPasswordLink}>
            <Text style={[styles.linkText1, { textAlign: "right" }]}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <Button text="Log in" onPress={() => {}} />
        </View>
        <TouchableOpacity style={styles.link}>
          <Text style={styles.linkText1}>New User? </Text>
          <Text style={styles.linkText2}>Create Account</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
