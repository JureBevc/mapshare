import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from "react-native";
import Global from "../GlobalParameters";
import TextButton from "../TextButton";
import Expo from "expo";
import * as Google from "expo-google-app-auth";
import firebase from "firebase/app";
import * as Facebook from "expo-facebook";

class LoginScreen extends Component {
  updateUserInfo = async (uid) => {
    if (this.uploading) return;
    this.uploading = true;

    this.uploading = false;
  };

  signInWithGoogle = async () => {
    console.log("LoginScreen.js | loggin in with google");
    try {
      const logInResult = await Google.logInAsync({
        androidClientId:
          "961970114032-jekqtd1ug6ugio4ql485g3fj0jdug14g.apps.googleusercontent.com",
        androidStandaloneAppClientId:
          "961970114032-h0k9tp0jbgeqc1kbf3rlp66bv20j7gbm.apps.googleusercontent.com",
      });

      if (logInResult.type === "success") {
        console.log("Log in successful");
        console.log("Authenticating user");

        // Build Firebase credential with the access token.
        const credential = firebase.auth.GoogleAuthProvider.credential(
          logInResult.idToken,
          logInResult.accessToken
        );

        // Sign in with credential from the user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            // Handle Error.
            console.log("Firebase authentication error");
            console.log(error);
          });

        if (firebase.auth().currentUser) {
          console.log("Current user is set");
          this.props.navigation.navigate("Map");
        }
      }
    } catch (error) {
      console.log("LoginScreen.js | error with login", error);
    }
  };

  signInWithEmail() {}

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused
      console.log("Login focused");
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("User authenticated");
          navigation.navigate("Map");
        }
      });

      let user = firebase.auth().currentUser;
      if (user) {
        console.log("User already authenticated");
        navigation.navigate("Map");
      }
    });

    let user = firebase.auth().currentUser;
    if (user) {
      console.log("User already authenticated");
      navigation.navigate("Map");
    }
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    console.log("Login screen");
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.titleLogo}
          source={require("../../assets/title-logo.png")}
        ></Image>
        <View style={styles.buttonWrap}></View>
        <View style={styles.buttonWrap}>
          <TextButton
            text="Sign in with Google"
            backgroundStyle={{
              backgroundColor: Global.WHITE,
              borderRadius: 10,
              borderColor: "#DB4437",
              borderWidth: 2,
            }}
            customStyle={{
              fontSize: 20,
              color: "#DB4437",
              padding: 5,
            }}
            handlePress={() => {
              this.signInWithGoogle();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Global.WHITE,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  titleLogo: {
    width: "40%",
    height: "30%",
  },
  buttonWrap: {
    padding: "5%",
  },
});

export default LoginScreen;
