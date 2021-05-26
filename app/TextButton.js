import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Global from "./GlobalParameters";

export default function TextButton({ text, handlePress }) {
  return (
    <View
      style={{
        alignSelf: "baseline",
      }}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: Global.GRAY,
          borderRadius: 3,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: Global.WHITE,
            alignContent: "center",
            flexWrap: "wrap",
            alignSelf: "baseline",
            padding: 5,
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
