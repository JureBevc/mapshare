import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

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
          backgroundColor: "#fff",
          borderWidth: 1,
          borderColor: "#000",
          borderRadius: 3,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#000",
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
