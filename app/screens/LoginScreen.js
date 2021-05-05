import React from "react";
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from "react-native";
import Global from "../GlobalParameters.js";
import TextButton from "../TextButton.js";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Test</Text>
        <TextButton
          text="Login"
          handlePress={() => {
            navigation.navigate("Map");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Global.WHITE,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default LoginScreen;
