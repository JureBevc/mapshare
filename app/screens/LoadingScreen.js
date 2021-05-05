import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  Platform,
  StatusBar,
} from "react-native";
import Global from "../GlobalParameters";
import firebase from "firebase";

const checkIfLoggedIn = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      callback(true);
    } else {
      callback(false);
    }
  });
};

const LoadingScreen = ({ navigation }) => {
  console.log("Loading screen");
  checkIfLoggedIn((isLoggedIn) => {
    if (isLoggedIn) {
      navigation.navigate("Map");
    } else {
      navigation.navigate("Login");
    }
  });
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={Global.PRIMARY_COLOR} />
    </SafeAreaView>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Global.WHITE,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignContent: "center",
    justifyContent: "center",
  },
});
