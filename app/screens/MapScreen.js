import React from "react";
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

export default MapScreen = ({ navigation }) => {
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
            handlePress={() => alert("TODO")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

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
