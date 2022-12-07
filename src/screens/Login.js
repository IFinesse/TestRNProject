import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "../consts";
import Logo from "../components/Logo";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Logo />
      </View>
      <Text style={styles.title}>Log In To Woorkroom</Text>
      <Input
        label="Your email"
        // autoFocus={true}
        placeholder="Email"
      />
      <View style={styles.passwordWrapper}>
        <Input label="Password" isPassword={true} placeholder="Password" />
        <TouchableOpacity onPress={() => {}} style={styles.forgotPasswordLink}>
          <Text style={[styles.linkText1, { textAlign: "right" }]}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
      <Button text="Log in" onPress={() => {}} />
      <TouchableOpacity style={styles.link}>
        <Text style={styles.linkText1}>New User? </Text>
        <Text style={styles.linkText2}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 32,
    // alignItems: "center",
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinsMedium",
    fontSize: 24,
    color: colors.black,
    textAlign: "center",
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
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
