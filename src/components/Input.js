import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "../consts";
import { EyeClosed, EyeOpened } from "./EyeIcons";

const Input = ({ label, isPassword, ...props }) => {
  const [secure, setSecure] = useState(isPassword);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput secureTextEntry={secure} {...props} style={styles.input} />
        {isPassword ? (
          <TouchableOpacity style={styles.lockIcon} onPress={() => setSecure((secure) => !secure)}>
            {secure ? <EyeOpened /> : <EyeClosed />}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    marginVertical: 22,
  },
  label: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    color: colors.grey,
    textTransform: "capitalize",
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
  },
  lockIcon: {
    alignSelf: "center",
  },
});

export default Input;
