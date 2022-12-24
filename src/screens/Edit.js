import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState, useContext, useEffect } from "react";
import { colors } from "../consts";
import Input from "../components/Input";
import Button from "../components/Button";
import { isIos, validateEmail, validatePhone } from "../utils";
import { EditIcon } from "../components/Icons";
import ModalSelector from "react-native-modal-selector";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import CameraWrapper from "../components/Camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import { UserContext } from "../../App";
import showMessage from "../utils/message";

const db = SQLite.openDatabase("users.db");

const formatPhone = (value) => {
  let arr = value.split("");
  arr[0] = "+";
  if (arr[4] && arr[4] !== "-") arr.splice(4, 0, "-");
  if (arr[9] && arr[9] !== "-") arr.splice(9, 0, "-");
  if (arr[14] && arr[14] !== "-") arr.splice(14, 0, "-");
  if (arr[arr.length - 1] === "-" || arr[arr.length - 1] === " ") arr.pop();
  return arr.join("");
};

const validateName = (name) => {
  return name;
};

const Edit = ({ navigation }) => {
  const [mainLoading, setMainLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const modalRef = useRef();
  const [camera, setCamera] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+");
  const [position, setPosition] = useState("");
  const [skype, setSkype] = useState("");

  const { setLoggedIn, userEmail } = useContext(UserContext);

  useEffect(() => {
    setMainLoading(true);
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE email = ?",
        [userEmail],
        (txObj, resultSet) => {
          setName(resultSet.rows._array[0]?.name);
          setEmail(resultSet.rows._array[0]?.email);
          setPhone(resultSet.rows._array[0]?.phone);
          setPosition(resultSet.rows._array[0]?.position);
          setSkype(resultSet.rows._array[0]?.skype);
          setImage(resultSet.rows._array[0]?.image);
          setMainLoading(false);
        },
        (txObj, error) => {
          showMessage({
            message: "Something went wrong",
            type: "danger",
          });
          setMainLoading(false);
        }
      );
    });
  }, []);

  const handleSave = () => {
    if (name && validatePhone(phone) && validateEmail(email)) {
      setSaveLoading(true);
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE users SET name = ?, email = ?, phone = ?, position = ?, skype = ?, image = ? WHERE email = ?",
          [name, email, phone, position, skype, image, userEmail],
          (txObj, resultSet) => {
            showMessage({
              message: "Prifile info has been successfuly updated",
              type: "success",
            });
            setSaveLoading(false);
          },
          (txObj, error) => {
            showMessage({
              message: "Something went wrong",
              type: "danger",
            });
            setSaveLoading(false);
          }
        );
      });
    } else {
      alert("please check if all fields are valid");
    }
  };

  const handleLogOut = () => {
    setLoggedIn(false);
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

  if (mainLoading) {
    return (
      <View style={styles.mainLoading}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView behavior={isIos ? "padding" : "height"}>
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
            validateInput={validatePhone}
            keyboardType="number-pad"
            maxLength={17}
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
            <Button text="Save" onPress={handleSave} loading={saveLoading} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  mainLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Edit;
