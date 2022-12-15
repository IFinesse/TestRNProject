import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState, useRef } from "react";
import { colors, SCREEN_WIDTH } from "../../consts";

const ImageContainer = ({ photo, onSave, onRetake, onGoBack }) => {
  // const [photo, setPhoto] = useState(null);

  return (
    <View style={styles.container}>
      <Image source={{ uri: "data:image/jpg;base64," + photo.base64 }} style={styles.preview} />
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={onRetake} style={styles.buttonWrapper}>
          <Text style={styles.text}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSave} style={styles.buttonWrapper}>
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wrapper: {
    flexDirection: "row",
    width: SCREEN_WIDTH,
    height: 60,
    backgroundColor: "#000000",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  buttonWrapper: {
    width: 100,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
  },
});

export default ImageContainer;
