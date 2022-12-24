import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../consts";
import showMessage from "../utils/message";

const Button = ({ text, onPress, loading, disabled }) => {
  return disabled ? (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.lightGrey }]}
      onPress={() =>
        showMessage({ message: "Please check if all fields are valid", type: "error" })
      }
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={disabled ? null : onPress} style={styles.button}>
      {loading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.orange,
  },
  text: {
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    color: colors.black,
    textTransform: "capitalize",
    marginHorizontal: 25,
    textAlign: "center",
  },
});

export default Button;
