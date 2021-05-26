import React, { Component } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import Global from "../GlobalParameters";

export class ContentScreen extends Component {
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
