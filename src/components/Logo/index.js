import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LogoSVG1, LogoSVG2, LogoSVG3 } from "./SVGParts";

const Logo = () => {
  console.log("bla logo");
  return (
    <View style={styles.container}>
      <LogoSVG2 style={styles.wrapper2} />
      <LogoSVG3 style={styles.wrapper3} />
      <LogoSVG1 style={styles.wrapper1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  wrapper1: {
    position: "relative",
    top: -41,
  },
  wrapper2: {
    position: "relative",
  },
  wrapper3: {
    position: "relative",
    top: -43,
  },
});

export default Logo;
