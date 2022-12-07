import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../consts";

// const Input = (props) => {
//   return (<View>
//     <Text style={styles.label}>
//     <TextInput {...props}>
//   </View>)
// }

const Button = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.text}>{text}</Text>
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
