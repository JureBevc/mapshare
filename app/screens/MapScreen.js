import React, { Component } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import ImageButton from "../ImageButton";
import Global from "../GlobalParameters";
import { Camera } from "expo-camera";

export default class MapScreen extends Component {
  state = {
    hasCameraPermission: false,
  };

  getCameraPermission = async (onSuccess) => {
    const { status } = await Camera.requestPermissionsAsync();
    console.log(status);
    this.state.hasCameraPermission = status === "granted";
    if (this.state.hasCameraPermission) {
      onSuccess();
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MapView style={styles.map} />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: "5%",
            pointerEvents: "none",
          }}
        >
          <View>
            <ImageButton
              imageSource={require("../../assets/camera.png")}
              width={50}
              height={50}
              customStyle={{
                backgroundColor: Global.WHITE,
                borderColor: Global.GRAY,
                borderRadius: 45,
                borderWidth: 2,
                padding: 5,
              }}
              handlePress={() => {
                if (this.state.hasCameraPermission) {
                  console.log("Opening camera");
                  this.props.navigation.navigate("Camera");
                } else {
                  console.log("Getting camera permission");
                  this.getCameraPermission(() => {
                    this.props.navigation.navigate("Camera");
                  });
                }
              }}
            />
          </View>
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
  },
  map: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});
