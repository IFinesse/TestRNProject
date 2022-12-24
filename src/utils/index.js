import { Platform } from "react-native";

export const isIos = Platform.OS === "ios";

export const validateEmail = (email) => {
  return /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
    email.toLowerCase()
  );
};

export const validatePassword = (password) => {
  return password.length > 7;
};

export const cleanNumber = (number) => number.split(" ").join("").split("-").join("");

export const validatePhone = (number) => {
  const cleanedNumber = cleanNumber(number);
  return cleanedNumber.length > 4 && cleanedNumber.length < 14;
};
