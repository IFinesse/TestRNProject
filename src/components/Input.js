import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "../consts";
import { EyeClosed, EyeOpened } from "./Icons";

const Input = ({
  label,
  value,
  onChangeText,
  isPassword,
  isConfirmPassword,
  validateInput,
  ...props
}) => {
  const [secure, setSecure] = useState(isPassword || isConfirmPassword);
  const [isError, setError] = useState(false);

  const onBlurHandle = (value) => {
    validateInput(value) ? null : setError(true);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: isError ? colors.red : colors.grey }]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          { borderBottomColor: isError ? colors.red : colors.lightGrey },
        ]}
      >
        <TextInput
          secureTextEntry={secure}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, { color: isError ? colors.red : colors.black }]}
          onFocus={() => {
            setError(false);
          }}
          onBlur={() => (validateInput ? onBlurHandle(value) : null)}
          {...props}
        />
        {isPassword || isConfirmPassword ? (
          <TouchableOpacity style={styles.lockIcon} onPress={() => setSecure((secure) => !secure)}>
            {secure ? <EyeOpened /> : <EyeClosed />}
          </TouchableOpacity>
        ) : null}
      </View>
      {isError ? (
        <Text style={styles.errorText}>
          {isPassword
            ? "The password should contain at least 8 symbols"
            : isConfirmPassword
            ? "The password isn't equal to the field above"
            : "The value is invalid"}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  label: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    lineHeight: 21,
    color: colors.grey,
    textTransform: "capitalize",
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 12,
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    lineHeight: 21,
    color: colors.grey,
  },
  lockIcon: {
    alignSelf: "center",
    padding: 15,
  },
  errorText: {
    fontFamily: "PoppinsMedium",
    fontSize: 10,
    color: colors.red,
  },
});

export default Input;
