import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { colors } from "../../consts";

const Input = ({ onBlur }) => {
  const [isError, setError] = useState(false);
  const [number, setNumber] = useState("");

  const onBlurHandle = (value) => {
    validateInput(value) ? null : setError(true);
  };

  const formatNumber = (value) => {
    let arr = value.split("");
    if (arr[3] && arr[3] !== " ") arr.splice(3, 0, " ");
    if (arr[7] && arr[7] !== "-") arr.splice(7, 0, "-");
    if (arr[10] && arr[10] !== "-") arr.splice(10, 0, "-");
    return arr.join("");
  };

  const validateNumber = (number) => number.length > 4 && number.length < 13;

  return (
    <View style={styles.container}>
      <View style={[styles.inputWrapper, { borderColor: isError ? colors.red : colors.lightGrey }]}>
        <TextInput
          value={formatNumber(number)}
          onChangeText={setNumber}
          style={[styles.input, { color: isError ? colors.red : colors.grey }]}
          onFocus={() => {
            setError(false);
          }}
          onBlur={() => (validateNumber(number) ? onBlur(number) : setError(true))}
          keyboardType="number-pad"
          maxLength={13}
        />
      </View>
      {isError ? <Text style={styles.errorText}>The value is invalid</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  input: {
    paddingLeft: 15,
    flex: 1,
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    // color: colors.grey,
  },
  errorText: {
    fontFamily: "PoppinsMedium",
    fontSize: 10,
    color: colors.red,
  },
});

export default Input;
