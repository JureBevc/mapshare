import React, { Component } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  BackHandler,
} from "react-native";
import ImageButton from "../ImageButton";
import Global from "../GlobalParameters";
import { Camera } from "expo-camera";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default class MapScreen extends Component {
  state = {
    hasCameraPermission: false,
    hasLocationPermission: false,
    location: null,
    markers: [],
  };

  getCameraPermission = async (onSuccess) => {
    console.log("Getting camera permission");
    const { status } = await Camera.requestPermissionsAsync();
    console.log(status);
    this.state.hasCameraPermission = status === "granted";
    if (onSuccess && this.state.hasCameraPermission) {
      onSuccess();
    }
  };

  getLocationPermission = async (onSuccess) => {
    console.log("Getting location permission");
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    this.state.hasLocationPermission = status === "granted";
    if (onSuccess && this.state.hasLocationPermission) {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Lowest,
      });
      onSuccess(location);
    }
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      // Overwrite back button press
      return true;
    });

    this.getLocationPermission((location) => {
      let userMarker = {
        latlng: {
          latitude: location["coords"]["latitude"],
          longitude: location["coords"]["longitude"],
        },
        title: "You",
        image: require("../../assets/map-marker-user.png"),
      };

      this.setState({
        location: {
          latitude: location["coords"]["latitude"],
          longitude: location["coords"]["longitude"],
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        },
        markers: [...this.state.markers, userMarker],
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          region={this.state.location}
          style={styles.map}
          mapType="hybrid"
          maxZoomLevel={15}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              style={styles.marker}
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
            >
              <Image
                source={marker.image}
                style={styles.marker}
                resizeMode="contain"
              />
            </Marker>
          ))}
        </MapView>
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
                    if (this.state.location)
                      this.props.navigation.navigate("Camera", {
                        location: this.state.location,
                      });
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
  marker: {
    width: 50,
    height: 50,
  },
});
