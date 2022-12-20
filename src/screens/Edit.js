import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../consts";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateEmail, validatePassword } from "../utils";
import { EditIcon } from "../components/Icons";
import ModalSelector from "react-native-modal-selector";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import CameraWrapper from "../components/Camera";
import { MaterialIcons } from "@expo/vector-icons";

const formatPhone = (phone) => {
  return phone;
};

const validatePhone = (phone) => {
  return phone;
};

const validateName = (name) => {
  return name;
};

const Edit = ({ navigation }) => {
  const modalRef = useRef();
  const [camera, setCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [skype, setSkype] = useState("");

  const handleSave = () => {
    if (name && validatePhone(phone) && validateEmail(email)) {
      console.log("submit");
    }
  };

  const handleLogOut = () => {
    navigation.navigate("Login");
  };

  const uploadPhotoSelectorData = [
    { key: 1, label: "Take Photo" },
    { key: 2, label: "Choose Photo" },
  ];

  const choosePhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onOpenCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === ImagePicker.PermissionStatus.GRANTED) {
      setCamera(true);
    } else {
      alert(
        "Access to camera is denied, please allow using camera for the application in settings"
      );
    }
  };

  const handleSavePhoto = (photo) => {
    setImage(photo.uri);
    setCamera(null);
  };

  if (camera) {
    return <CameraWrapper savePhoto={handleSavePhoto} goBack={() => setCamera(null)} />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ height: 0 }}>Log out</Text>
          <Text style={styles.headerText}>Edit Profile</Text>
          <TouchableOpacity onPress={handleLogOut}>
            <Text style={styles.logOutText}>Log out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <ModalSelector
            ref={modalRef}
            data={uploadPhotoSelectorData}
            onModalClose={(option) => {
              option.label === "Choose Photo"
                ? choosePhoto()
                : option.label === "Take Photo"
                ? onOpenCamera()
                : null;
            }}
            cancelText="Cancel"
            overlayStyle={{ justifyContent: "flex-end" }}
            optionStyle={{ padding: 20 }}
            optionContainerStyle={{ borderRadius: 10 }}
            cancelStyle={{ padding: 20 }}
            cancelTextStyle={{ fontFamily: "PoppinsMedium", fontSize: 16, color: colors.black }}
            backdropPressToClose={true}
            animationType="fade"
          >
            <TouchableOpacity onPress={() => {}} style={styles.imageWrapper}>
              {image ? (
                <Image style={styles.image} source={{ uri: image }} />
              ) : (
                // <Image
                //   style={[styles.image, { borderWidth: 1 }]}
                //   source={require("../../assets/emptyPhoto.png")}
                // />
                <View style={styles.emptyPhoto}>
                  <MaterialIcons name="add-a-photo" size={24} color={colors.grey} />
                </View>
              )}

              <View style={styles.editIconWrapper}>
                <EditIcon />
              </View>
            </TouchableOpacity>
          </ModalSelector>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.position}>{position}</Text>
        <Input
          label="Name"
          value={name}
          onChangeText={(value) => setName(value)}
          placeholder="Name"
          validateInput={validateName}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          placeholder="Email"
          validateInput={validateEmail}
          keyboardType="email-address"
        />
        <Input
          label="Phone"
          value={formatPhone(phone)}
          onChangeText={(value) => setPhone(value)}
          placeholder="Phone"
          validateInput={validatePassword}
        />
        <Input
          label="Position"
          value={position}
          onChangeText={(value) => setPosition(value)}
          placeholder="Position"
          validateInput={validateName}
        />
        <Input
          label="Skype"
          value={skype}
          onChangeText={(value) => setSkype(value)}
          placeholder="Skype"
          validateInput={validateName}
        />
        <View style={styles.buttonWrapper}>
          <Button text="Save" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    marginVertical: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    lineHeight: 27,
    fontFamily: "PoppinsMedium",
    fontSize: 18,
    color: colors.black,
  },
  logOutText: {
    lineHeight: 24,
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: colors.orange,
  },
  imageContainer: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: colors.lightGrey,
  },
  emptyPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    backgroundColor: "rgba(0,0,0, 0.1)",
    borderColor: colors.lightGrey,
    justifyContent: "center",
    alignItems: "center",
  },
  editIconWrapper: {
    position: "absolute",
    left: 45,
    top: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 24,
    height: 24,
    backgroundColor: colors.lightGrey2,
  },
  name: {
    marginTop: 10,
    lineHeight: 36,
    fontFamily: "PoppinsMedium",
    fontSize: 24,
    color: colors.black,
    textAlign: "center",
  },
  position: {
    marginTop: 3,
    lineHeight: 21,
    fontFamily: "PoppinsMedium",
    fontSize: 14,
    color: colors.grey,
    textAlign: "center",
    textTransform: "capitalize",
    marginBottom: -10,
  },
  buttonWrapper: {
    marginTop: 50,
  },
});

export default Edit;
