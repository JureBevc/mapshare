import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  Platform,
  StatusBar,
  BackHandler,
} from "react-native";
import Global from "../GlobalParameters";
import firebase from "firebase";

class LoadingScreen extends Component {
  componentDidMount() {
    this.backListener = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Overwrite back button press
        console.log("BACK BUTTON");
        return false;
      }
    );

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      console.log("Loading screen checking if logged in");
      let user = firebase.auth().currentUser;
      if (user) {
        console.log("User already authenticated");
        this.props.navigation.navigate("Map");
      } else {
        console.log("No current user");
        this.props.navigation.navigate("Login");
      }
    });

    this.blurListener = navigation.addListener("didBlur", () => {
      this.backListener.remove();
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
    this.blurListener.remove();
  }

  render() {
    console.log("Loading screen");
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={Global.PRIMARY_COLOR} />
      </SafeAreaView>
    );
  }
}

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
