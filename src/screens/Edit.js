import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../consts";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateEmail, validatePassword } from "../utils";
import { EditIcon } from "../components/Icons";
import ModalSelector from "react-native-modal-selector";

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

  const choosePhoto = () => {
    return "1";
  };

  const takePhoto = () => {
    return "2";
  };

  console.log("bla");
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
            data={uploadPhotoSelectorData}
            // initValue="Choose Photo"
            visible={true}
            onModalClose={(option) => {
              option.label === "Choose Photo"
                ? console.log(choosePhoto())
                : console.log(takePhoto());
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
              {/* {true ? (
              <Image style={styles.image} source={require("../../assets/emptyPhoto.png")} />
            ) : null} */}
              <Image style={styles.image} source={require("../../assets/emptyPhoto.png")} />
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
    borderWidth: 1,
    borderColor: colors.lightGrey,
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
