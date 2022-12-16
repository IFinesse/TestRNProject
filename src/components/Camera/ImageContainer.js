import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors, SCREEN_WIDTH, SCREEN_HEIGHT } from "../../consts";

const ImageContainer = ({ photo, onSave, onRetake }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: photo.uri }}
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        style={styles.preview}
      />
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
