import React, { Component } from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import ImageButton from "../ImageButton";
import Global from "../GlobalParameters";
import UserData from "../UserData";
import firebase from "firebase";
import { db } from "../../config";
import uuid from "react-native-uuid";
import * as ImageManipulator from "expo-image-manipulator";

export default class EditorScreen extends Component {
  constructor(props) {
    super(props);
  }

  uploadImage = async (location, image) => {
    if (this.uploading) return;
    this.uploading = true;

    navigation = this.props.navigation;

    console.log("Uploading photo");
    try {
      console.log("Uploading photo1");
      const imagesRef = db.ref("images");
      const newImageRef = imagesRef.push();

      console.log("Uploading photo2");
      const compressed = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: 1080 } }],
        { format: "jpeg", compress: 0.5 }
      );
      console.log("Uploading photo3");
      console.log(compressed.uri);
      const response = await fetch(compressed.uri);
      console.log("Uploading photo4");
      const imageBlob = await response.blob();
      console.log("Uploading photo5");

      const id = uuid.v4();
      console.log("Uploading photo6");

      console.log("--");
      console.log(id);
      console.log("--");
      console.log(imageBlob.size);
      console.log("--");

      newImageRef.set({
        user: firebase.auth().currentUser.uid,
        latitude: location.latitude,
        longitude: location.longitude,
        imageId: id,
      });

      firebase
        .storage()
        .ref()
        .child("images/" + id)
        .put(imageBlob)
        .then(function (snapshot) {
          console.log("Image uploaded!");
          navigation.navigate("Map", { updateMap: true });
        });
    } catch (err) {
      console.log("ERROR UPLOADING IMAGE");
      navigation.navigate("Map", { updateMap: true });
      //console.error(err);
    }
    this.uploading = false;
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: this.props.navigation.state.params.image.uri }}
        />
        <View style={styles.controls}>
          <View>
            <ImageButton
              imageSource={require("../../assets/send-icon.png")}
              width={35}
              height={35}
              customStyle={{
                backgroundColor: "transparent",
                padding: 25,
              }}
              handlePress={() => {
                this.uploadImage(
                  UserData.location,
                  this.props.navigation.state.params.image
                );
              }}
            ></ImageButton>
          </View>
        </View>
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
    top: 0,
    width: "100%",
    height: "100%",
  },
  controls: {
    flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
});
