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
          <Image
            style={{ width: 100, height: 100, margin: "5%" }}
            source={{ uri: firebase.auth().currentUser.photoURL }}
          />
          <Text style={{ fontSize: 25, margin: "5%" }}>
            {firebase.auth().currentUser.displayName}
          </Text>
        </View>

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
    justifyContent: "space-around",
    alignItems: "center",
  },
});
