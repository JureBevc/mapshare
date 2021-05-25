import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  BackHandler,
} from "react-native";
import ImageButton from "../ImageButton";
import TextButton from "../TextButton";
import Global from "../GlobalParameters";
import firebase from "firebase/app";

export default class SettingsScreen extends Component {
  signOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <TextButton
            text="Sign out"
            handlePress={() => {
              this.signOut();
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
    justifyContent: "center",
    alignItems: "center",
  },
});
