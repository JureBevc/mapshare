import React, { Component } from "react";
import { Image, Text, View, StyleSheet, BackHandler } from "react-native";
import Global from "../GlobalParameters";

export class ContentScreen extends Component {
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.focused = true;
      console.log("Content screen focus");

      // Overwrite back button
      this.backListener = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          // Disable back button press
          return false;
        }
      );
    });

    this.blurListener = navigation.addListener("didBlur", () => {
      this.focused = false;
      if (this.backListener) this.backListener.remove();
    });
  }

  componentWillUnmount() {
    if (this.blurListener) {
      this.blurListener.remove();
    }
    if (this.focusListener) {
      this.focusListener.remove();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: this.props.navigation.state.params.imageURL }}
        />
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

export default ContentScreen;
