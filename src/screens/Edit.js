import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors } from "../consts";
import Input from "../components/Input";
import Button from "../components/Button";
import { validateEmail, validatePassword } from "../utils";

const formatPhone = (phone) => {
  return phone;
};

const validatePhone = (phone) => {
  return phone;
};

const Edit = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [skype, setSkype] = useState("");

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const validateName = () => {
    return name;
  };

  const handleSave = () => {
    if (name && validatePhone(phone) && validateEmail(email)) {
      console.log("submit");
    }
  };

  const handleLogOut = () => {
    navigation.navigate("Login");
  };

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
  title: {
    lineHeight: 36,
    fontFamily: "PoppinsMedium",
    fontSize: 24,
    color: colors.black,
    textAlign: "center",
  },
  buttonWrapper: {
    marginTop: 50,
  },
});

export default Edit;
