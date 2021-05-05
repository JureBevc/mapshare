import React, { Component } from "react";
import { Camera } from "expo-camera";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";

export default class CameraScreen extends Component {
  render() {
    const dimensions = Dimensions.get("window");
    const screenWidth = dimensions.width;
    const height = Math.round((screenWidth * 16) / 9);
    return (
      <View style={styles.container}>
        <Camera
          ratio="16:9"
          style={{
            height: height,
            width: "100%",
          }}
          type={Camera.Constants.Type.front}
        ></Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
