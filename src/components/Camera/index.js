import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { colors, SCREEN_WIDTH } from "../../consts";
import { Camera, CameraType } from "expo-camera";
import AntDesign from "@expo/vector-icons/AntDesign";
import ImageContainer from "./ImageContainer";
import { isIos } from "../../utils";

const CameraWrapper = ({ savePhoto, goBack }) => {
  const cameraRef = useRef(null);

  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    let result = await cameraRef.current.takePictureAsync({
      quality: 1,
    });
    setPhoto(result);
  };

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const handleRetake = () => {
    setPhoto(null);
  };

  const handleSave = () => {
    savePhoto(photo);
  };

  if (photo) {
    return <ImageContainer photo={photo} onRetake={handleRetake} onSave={handleSave} />;
  }

  return isIos ? (
    <Camera ref={cameraRef} style={styles.container} type={type}>
      <View style={styles.iosWrapper}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={goBack}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outerCircle} onPress={takePhoto}>
          <View style={styles.innerCircle}></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={toggleCameraType}>
          <View style={styles.toggle}>
            <AntDesign style={{ color: "#F5F5F5" }} size={24} name="sync" />
          </View>
        </TouchableOpacity>
      </View>
    </Camera>
  ) : (
    <View style={styles.container}>
      <Camera ref={cameraRef} type={type} style={styles.camera} ratio="4:3" />
      <View style={styles.androidWrapper}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={goBack}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outerCircle} onPress={takePhoto}>
          <View style={styles.innerCircle}></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={toggleCameraType}>
          <View style={styles.toggle}>
            <AntDesign style={{ color: "#F5F5F5" }} size={24} name="sync" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} type={type} style={styles.camara} ratio="4:3" />
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={goBack}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outerCircle} onPress={takePhoto}>
          <View style={styles.innerCircle}></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={toggleCameraType}>
          <View style={styles.toggle}>
            <AntDesign style={{ color: "#F5F5F5" }} size={24} name="sync" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Camera ref={cameraRef} style={styles.container} type={type}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.buttonWrapper} onPress={goBack}>
          <View style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outerCircle} onPress={takePhoto}>
          <View style={styles.innerCircle}></View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapper} onPress={toggleCameraType}>
          <View style={styles.toggle}>
            <AntDesign style={{ color: "#F5F5F5" }} size={24} name="sync" />
          </View>
        </TouchableOpacity>
      </View>
    </Camera>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  camera: {
    width: SCREEN_WIDTH,
    height: (SCREEN_WIDTH / 3) * 4,
  },
  iosWrapper: {
    flexDirection: "row",
    width: SCREEN_WIDTH,
    height: 120,
    justifyContent: "space-between",
    alignItems: "center",
  },
  androidWrapper: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  buttonWrapper: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    width: 90,
    height: 45,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    lineHeight: 21,
    color: "#F3F3F3",
  },
  cancelWrapper: {
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    lineHeight: 21,
    color: colors.grey,
  },
  outerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F3F3F3",
  },
  innerCircle: {
    width: 62,
    height: 62,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 31,
    position: "relative",
    left: 4,
    top: 4,
  },
  toggle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CameraWrapper;
