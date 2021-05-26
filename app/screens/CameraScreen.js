import React, { Component, useState } from "react";
import { Camera } from "expo-camera";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import Global from "../GlobalParameters";
import TextButton from "../TextButton";
import { CameraType } from "expo-camera/build/Camera.types";
import ImageButton from "../ImageButton";
import { withNavigationFocus } from "react-navigation";

class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      cameraType: Camera.Constants.Type.back,
      loaded: false,
    };
  }

  takePicture = async () => {
    if (this.takingPicture) return;
    this.takingPicture = true;
    console.log("Taking picture");
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      this.props.navigation.navigate("Editor", {
        image: photo,
      });
    }
    this.takingPicture = false;
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log("Camera focus");
      this.setState({ loaded: true });
    });
    this.blurListener = navigation.addListener("didBlur", () => {
      console.log("Camera unfocus");
      this.setState({ loaded: false });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.blurListener.remove();
  }

  render() {
    const dimensions = Dimensions.get("window");
    const screenWidth = dimensions.width;
    const height = Math.round((screenWidth * 16) / 9);
    return (
      <View style={styles.container}>
        {this.state.loaded && (
          <Camera
            ratio="16:9"
            style={{
              height: height,
              width: screenWidth,
              justifyContent: "flex-end",
              alignContent: "center",
              alignItems: "flex-end",
            }}
            type={this.state.cameraType}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <View>
              <ImageButton
                imageSource={require("../../assets/flip-camera.png")}
                width={35}
                height={35}
                customStyle={{
                  backgroundColor: "transparent",
                }}
                handlePress={() => {
                  console.log("Flipping camera");
                  let newState =
                    this.state.cameraType === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back;
                  this.setState({ cameraType: newState });
                }}
              ></ImageButton>
            </View>
          </Camera>
        )}

        <View style={styles.controls}>
          <View>
            <ImageButton
              imageSource={require("../../assets/take-picture.png")}
              width={70}
              height={70}
              handlePress={() => {
                this.takePicture();
              }}
              customStyle={{
                backgroundColor: "transparent",
                padding: 5,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Global.BLACK,
  },
  controls: {
    flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
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

export default withNavigationFocus(CameraScreen);
