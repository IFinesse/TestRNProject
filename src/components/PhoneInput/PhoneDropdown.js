import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { colors } from "../../consts";

const items = [
  {
    label: "+1",
    value: "+1",
  },
  {
    label: "+2",
    value: "+2",
  },
  {
    label: "+3",
    value: "+3",
  },
  {
    label: "+4",
    value: "+4",
  },
  {
    label: "+5",
    value: "+5",
  },
  {
    label: "+6",
    value: "+6",
  },
  {
    label: "+7",
    value: "+7",
  },
  {
    label: "+8",
    value: "+8",
  },
  {
    label: "+9",
    value: "+9",
  },
  {
    label: "+11",
    value: "+11",
  },
  {
    label: "+10",
    value: "+10",
  },
  {
    label: "+380",
    value: "+380",
  },
];

const ArrowIconUp = () => (
  <View
    style={[
      styles.arrowIcon,
      {
        transform: [{ rotateZ: "135deg" }],
        top: 3,
      },
    ]}
  ></View>
);
const ArrowIconDown = () => (
  <View
    style={[
      styles.arrowIcon,
      {
        transform: [{ rotateZ: "-45deg" }],
        top: -2,
      },
    ]}
  ></View>
);

const PhoneDropdown = ({ onSelect }) => {
  const [selected, setSelected] = useState("+1");
  const [opened, setOpened] = useState(false);

  const onOpen = () => {
    setOpened((opened) => !opened);
  };

  return (
    <View style={styles.container}>
      {opened ? (
        <Pressable style={styles.input} onPress={onOpen}>
          <Text style={styles.inputText}>{selected}</Text>
          <ArrowIconDown />
        </Pressable>
      ) : (
        <View>
          <Pressable
            style={[
              styles.input,
              { borderBottomWidth: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
            ]}
            onPress={onOpen}
          >
            <Text style={styles.inputText}>{selected}</Text>
            <ArrowIconUp />
          </Pressable>
          <View style={styles.dropdownContainer}>
            {items
              .filter((item) => item.value !== selected)
              .map((item, index) => {
                return (
                  <Pressable
                    style={styles.selectItem}
                    key={index}
                    onPress={() => {
                      setSelected(item.value);
                      setOpened((opened) => !opened);
                      onSelect(selected);
                    }}
                  >
                    <Text style={styles.inputText}>{item.value}</Text>
                    <View style={{ width: 10, height: 5 }}></View>
                  </Pressable>
                );
              })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 25,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 70,
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  selectItem: {
    width: 70,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 70,
    height: 48,
  },
  dropdownContainer: {
    width: 70,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderTopWidth: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  inputText: {
    fontSize: 14,
    fontFamily: "PoppinsMedium",
    color: colors.grey,
  },
  arrowIcon: {
    width: 8,
    height: 8,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: colors.grey,
    position: "relative",
  },
});

export default PhoneDropdown;
