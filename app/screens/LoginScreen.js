import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from "react-native";
import Global from "../GlobalParameters";
import TextButton from "../TextButton";
import Expo from "expo";
import * as Google from "expo-google-app-auth";
import firebase from "firebase/app";

class LoginScreen extends Component {
  signInWithGoogle = async () => {
    console.log("LoginScreen.js | loggin in");
    try {
      const logInResult = await Google.logInAsync({
        androidClientId:
          "961970114032-jekqtd1ug6ugio4ql485g3fj0jdug14g.apps.googleusercontent.com",
      });

      if (logInResult.type === "success") {
        console.log("Log in successful");
        console.log("Authenticating user");

        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.GoogleAuthProvider.credential(
          logInResult.idToken,
          logInResult.accessToken
        );

        // Sign in with credential from the Facebook user.
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

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // The screen is focused

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("User authenticated");
          this.props.navigation.navigate("Map");
        }
      });

      let user = firebase.auth().currentUser;
      if (user) {
        console.log("User already authenticated");
        this.props.navigation.navigate("Map");
      } else {
        console.log("No current user");
      }
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  render() {
    console.log("Login screen");
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>MapShare</Text>
        <View>
          <TextButton
            text="Sign in with Google"
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
  title: {
    fontSize: 25,
    paddingBottom: "10%",
  },
});

export default LoginScreen;
