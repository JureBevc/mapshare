import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import Global from "../GlobalParameters";

export default class EditorScreen extends Component {
  constructor(props) {
    super(props);
    this.location = props.navigation.state.params.location;
    this.image = props.navigation.state.params.image;
    console.log(this.image);
  }

  uploadImage(location, image) {
    console.log("Uploading photo");
    const imagesRef = db.ref("images");
    const newImageRef = imagesRef.push();
    newImageRef.set({
      user: firebase.auth().currentUser.uid,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.image.uri }}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Global.WHITE,
  },
  image: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
