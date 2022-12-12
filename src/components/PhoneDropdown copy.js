import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../consts";

import { SelectList } from "react-native-dropdown-select-list";

const styles = StyleSheet.create({
  label: { fontFamily: "PoppinsMedium", fontSize: 14, color: colors.grey },
  wrapper: {
    // padding: 0,
    // margin: 0,
    justifyContent: "space-between",
    // justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 48,
    borderWidth: 1,
    // marginRight: 25,
    borderColor: colors.lightGrey,
    borderRadius: 15,
    // backgroundColor: "green",
    // alignSelf: "flex-start",
    // textAlign: "left",
  },
  text: {
    // textAlign: "center",
    // fontSize: 16,
    fontFamily: "PoppinsMedium",
    color: colors.grey,
    // backgroundColor: "green",
    paddingLeft: 0,
    marginLeft: -15,
  },
  dropdown: {
    width: 70,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  dropdownItem: {
    // backgroundColor: "red",

    // padding: 0,
    marginLeft: -15,
  },
  dropdownText: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: colors.grey,
  },
  arrowIcon: {
    width: 10,
    height: 10,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: colors.grey,
    transform: [{ rotateZ: "-45deg" }],
    position: "relative",
    top: -2,
    // backgroundColor: "red",
  },
});

const ArrowIcon = () => <View style={styles.arrowIcon}></View>;

const PhoneDropdown = () => {
  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "+380" },
    { key: "2", value: "+1  " },
    { key: "3", value: "+4  " },
    { key: "4", value: "+187" },
  ];

  return (
    // <View style={styles.root}>
    <SelectList
      // onSelect={() => setSelected(selected)}
      setSelected={setSelected}
      fontFamily="PoppinsMedium"
      data={data}
      arrowicon={<ArrowIcon />}
      // searchicon={<Text>search</Text>}
      search={false}
      boxStyles={styles.wrapper} //override default styles
      inputStyles={styles.text}
      dropdownStyles={styles.dropdown}
      dropdownItemStyles={styles.dropdownItem}
      dropdownTextStyles={styles.dropdownText}
      defaultOption={{ key: "1", value: "+1" }} //default selected option
    />
    // </View>
  );
};

export default PhoneDropdown;
