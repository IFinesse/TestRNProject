import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../consts";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const styles = StyleSheet.create({
  label: { fontFamily: "PoppinsMedium", fontSize: 14, color: colors.grey },
  codeFieldRoot: { marginTop: 15, justifyContent: "flex-start" },
  cellWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderWidth: 1,
    marginRight: 25,
    borderColor: colors.lightGrey,
    borderRadius: 15,
  },
  cell: {
    textAlign: "center",
    fontFamily: "PoppinsMedium",
    fontSize: 16,
    color: colors.black,
  },
  focusCell: {
    borderColor: colors.orange,
  },
});

const CELL_COUNT = 4;

const SMSInput = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.root}>
      <Text style={styles.label}>Code</Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View style={[styles.cellWrapper, isFocused && styles.focusCell]} key={index}>
            <Text style={[styles.cell]} onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default SMSInput;
