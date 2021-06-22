import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Global from "./GlobalParameters";

export default function TextButton({
  text,
  handlePress,
  customStyle,
  backgroundStyle,
}) {
  return (
    <View
      style={{
        alignSelf: "baseline",
      }}
    >
      <TouchableOpacity onPress={handlePress} style={backgroundStyle}>
        <Text style={customStyle}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

TextButton.defaultProps = {
  customStyle: {
    fontSize: 20,
    color: Global.WHITE,
    padding: 5,
  },
  backgroundStyle: {
    backgroundColor: Global.GRAY,
    borderRadius: 3,
  },
};

const styles = StyleSheet.create({});
