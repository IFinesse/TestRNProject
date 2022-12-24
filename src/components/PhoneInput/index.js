import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { colors } from "../../consts";
import PhoneDropdown from "./PhoneDropdown";
import Input from "./Input";

const PhoneInput = ({ onSubmit }) => {
  const [code, setCode] = useState("+1");

  const handleCode = (code) => {
    setCode(code);
  };

  const handlePhoneNumber = (number) => {
    let formatedNumber = number.split(" ").join("").split("-").join("");
    onSubmit([code, formatedNumber]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.phoneWrapper}>
        <PhoneDropdown onSelect={handleCode} />
        <Input onBlur={handlePhoneNumber} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    color: colors.grey,
    textTransform: "capitalize",
  },
  phoneWrapper: {
    flexDirection: "row",
    marginTop: 15,
  },
});

export default PhoneInput;
