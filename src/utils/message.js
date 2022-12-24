import { StyleSheet } from "react-native";

import { showMessage as showMsg } from "react-native-flash-message";
import { colors } from "../consts";

const showMessage = ({ type, message }) => {
  showMsg({
    type: type,
    icon: type,
    message: message,
    backgroundColor: type === "success" ? colors.successGreen : colors.red,
    animated: true,
    animationDuration: 300,
    duration: 2000,
    autoHide: true,
    titleStyle: styles.messageText,
  });
};

const styles = StyleSheet.create({
  messageText: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
  },
});

export default showMessage;
