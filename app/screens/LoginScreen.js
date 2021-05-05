import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, StatusBar } from "react-native";
import Global from "../GlobalParameters";
import TextButton from "../TextButton";
import * as GoogleSignIn from "expo-google-sign-in";

class LoginScreen extends Component {
  state = { user: null };

  render() {
    console.log("Login screen (signed in: " + (this.state.user != null) + " )");
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>MapShare</Text>
        <View>
          <TextButton
            text="Sign in with Google"
            handlePress={() => {
              this.props.navigation.navigate("Map"); //TODO: User authentication
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

/*
async function signInWithGoogle() {
  console.log("Google sign in...");
  try {
    await GoogleSignIn.askForPlayServicesAsync();
    const { type, user } = await GoogleSignIn.signInAsync();
    if (type === "success") {
      state.user = await GoogleSignIn.signInSilentlyAsync();
    }
  } catch ({ message }) {
    alert("login: Error:" + message);
  }
}
const LoginScreen = ({ navigation }) => {
  console.log("Login screen (signed in: " + (state.user != null) + " )");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MapShare</Text>
      <View>
        <TextButton
          text="Sign in with Google"
          handlePress={() => {
            signInWithGoogle();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
*/

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
