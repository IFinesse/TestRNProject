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
    // return `${value[0]}${value[1]}${value[2]} ${value[3]}${value[4]}${value[5]}-${value[6]}${value[7]}-${value[8]}${value[9]}-${value[10]}${value[11]}-${value[12]}${value[13]}`;
    return value;
  };

  const validateNumber = (number) => number.length > 4 && number.length < 13;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          { borderBottomColor: isError ? colors.red : colors.lightGrey },
        ]}
      >
        <TextInput
          value={formatNumber(number)}
          onChangeText={setNumber}
          style={[styles.input, { color: isError ? colors.red : colors.black }]}
          onFocus={() => {
            setError(false);
          }}
          onBlur={() => (validateNumber ? onBlur(number) : setError(true))}
        />
      </View>
      {isError ? <Text style={styles.errorText}>The value is invalid</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 52,
    marginVertical: 22,
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
    flex: 1,
    paddingVertical: 12,
  },
  errorText: {
    fontFamily: "PoppinsMedium",
    fontSize: 10,
    color: colors.red,
  },
});

export default Input;
