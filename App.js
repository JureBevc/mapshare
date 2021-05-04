import React from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import ImageButton from "./app/ImageButton";
import Global from "./app/GlobalParameters";

export default function App() {
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
            imageSource={require("./assets/camera.png")}
            width={50}
            height={50}
            customStyle={{
              backgroundColor: Global.WHITE,
              borderColor: Global.GRAY,
              borderRadius: 45,
              borderWidth: 2,
              padding: 5,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
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
