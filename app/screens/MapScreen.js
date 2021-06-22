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
  TouchableHighlight,
  Text,
  ToastAndroid,
} from "react-native";
import ImageButton from "../ImageButton";
import Global from "../GlobalParameters";
import { Camera } from "expo-camera";
import { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import UserData from "../UserData";
import { db } from "../../config";
import firebase from "firebase";

const LOCATION_UPDATE = "locationUpdate";
const MAX_CONTENT_AGE_HOURS = 24;

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
    this.setState({ hasCameraPermission: status === "granted" });
    if (onSuccess && this.state.hasCameraPermission) {
      onSuccess();
    }
  };

  getLocationPermission = async (onSuccess) => {
    console.log("Getting location permission");
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log(status);
    this.setState({ hasLocationPermission: status === "granted" });
    if (onSuccess && this.state.hasLocationPermission) {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.Lowest,
      });
      onSuccess(location);
    }
  };

  componentDidMount() {
    console.log("MOUNT");
    this.mounted = true;
    UserData.updateUserPreferences(firebase.auth().currentUser);
    this.getLocationPermission((location) => {
      UserData.location = {
        latitude: location["coords"]["latitude"],
        longitude: location["coords"]["longitude"],
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      };

      UserData.initialLocation = UserData.location;

      this.setState({
        location: UserData.initialLocation,
      });

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Low,
          distanceInterval: 3,
          deferredUpdatesInterval: 3000,
        },
        (location) => {
          //console.log("Updating location");
          //console.log(location);
          UserData.location = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          };

          this.updateUserMarker();
        }
      );

      this.updateMapMarkers();
    });

    //this.markersUpdateInterval = setInterval(this.updateMapMarkers, 10 * 1000);

    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.focused = true;
      console.log("Map screen focus");
      // Check if maps needs to be updated
      this.checkForMapUpdate();

      // Overwrite back button
      this.backListener = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          // Disable back button press
          return true;
        }
      );
    });

    // Remove listeners when not focused
    this.blurListener = navigation.addListener("didBlur", () => {
      this.focused = false;
      if (this.backListener) this.backListener.remove();
    });
  }

  componentWillUnmount() {
    this.mounted = false;
    this.focusListener.remove();
    this.blurListener.remove();

    if (this.markersUpdateInterval) {
      clearInterval(this.markersUpdateInterval);
    }

    Location.hasStartedLocationUpdatesAsync(LOCATION_UPDATE).then((value) => {
      if (value) {
        Location.stopLocationUpdatesAsync(LOCATION_UPDATE);
      }
    });

    if (this.blurListener) {
      this.blurListener.remove();
    }
    if (this.focusListener) {
      this.focusListener.remove();
    }
  }

  checkForMapUpdate() {
    let params = this.props.navigation.state.params;
    if (params && params.updateMap) {
      console.log("Updating map!");
      this.updateMapMarkers();
    }
  }

  updateUserMarker() {
    if (!this.focused) return;
    if (!this.mounted) return;
    let markers = this.state.markers;
    // Add user marker
    if (UserData.location != null) {
      let userMarker = {
        latlng: {
          latitude: UserData.location.latitude,
          longitude: UserData.location.longitude,
        },
        title: "You",
        image: require("../../assets/map-marker-user.png"),
      };

      if (markers.length > 0) {
        markers[0] = userMarker;
      } else {
        markers.push(userMarker);
      }
      this.setState({
        markers: markers,
      });
    }
  }

  updateMapMarkers = async () => {
    if (!this.mounted) {
      console.log("Not updaing markers: Not mounted");
      return;
    }

    let currentTime = new Date().getTime() / 1000;
    if (
      this.timeSinceUpdatedMarkers &&
      currentTime - this.timeSinceUpdatedMarkers < 2
    ) {
      console.log(
        "Not updaing markers: Not enough time passed " +
          (currentTime - this.timeSinceUpdatedMarkers)
      );
      return;
    }
    this.timeSinceUpdatedMarkers = currentTime;

    ToastAndroid.show("Updating your world", ToastAndroid.SHORT);
    console.log("Updating markers");
    let markers = [];

    // Add user marker
    if (UserData.location != null) {
      let userMarker = {
        latlng: {
          latitude: UserData.location.latitude,
          longitude: UserData.location.longitude,
        },
        title: "You",
        image: require("../../assets/map-marker-user.png"),
      };

      markers.push(userMarker);
    }

    // Add markers fo other users
    db.ref()
      .child("images")
      .once("value")
      .then((snapshot) => {
        let currentTime = new Date().getTime();
        snapshot.forEach((entry) => {
          let ageInHours = (currentTime - entry.val().time) / (1000 * 60 * 60);
          if (ageInHours >= 0 && ageInHours <= MAX_CONTENT_AGE_HOURS) {
            markers = this.state.markers;
            markers.push({
              latlng: {
                latitude: entry.val().latitude,
                longitude: entry.val().longitude,
              },
              contentId: entry.val().imageId,
              title: entry.val().displayName,
              description:
                "Posted " +
                (ageInHours >= 1
                  ? Math.round(ageInHours) + " hrs."
                  : Math.round(ageInHours * 60) + " min.") +
                " ago. Tap to view.",
              image: require("../../assets/map-marker-light.png"),
              userPhotoURL: entry.val().photoURL,
              publishTime: entry.val().time,
            });
          }
        });
        console.log("Setting markers " + markers.length);
        this.setState({
          markers: markers,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    console.log("Setting markers " + markers.length);
    this.setState({
      markers: markers,
    });
  };

  markerPress(marker) {
    if (this.lastmarkerPress && this.lastmarkerPress == marker) {
      if (marker.contentId) {
        // Display marker content
        console.log("Getting marker content");
        firebase
          .storage()
          .ref()
          .child("images/" + marker.contentId)
          .getDownloadURL()
          .then((url) => {
            this.props.navigation.navigate("Content", {
              imageURL: url,
            });
          })
          .catch((error) => {
            console.log("Error getting content");
            console.log(error);
          });
      }
    } else {
      this.lastmarkerPress = marker;
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          initialRegion={this.state.location}
          style={styles.map}
          mapType="satellite"
          maxZoomLevel={15}
          rotateEnabled={false}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              style={styles.marker}
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              onPress={() => this.markerPress(marker)}
              onCalloutPress={() => this.markerPress(marker)}
            >
              <Image
                source={marker.image}
                style={styles.marker}
                resizeMode="contain"
              />
              <Image
                source={{ uri: marker.userPhotoURL }}
                style={{
                  borderRadius: 45,
                  borderWidth: 2,
                  position: "absolute",
                  top: 5,
                  left: 12,
                  width: 25,
                  height: 25,
                }}
                resizeMode="contain"
              />
            </Marker>
          ))}
        </MapView>
        <SafeAreaView>
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              padding: "5%",
            }}
          >
            <ImageButton
              imageSource={require("../../assets/settings-icon.png")}
              width={40}
              height={40}
              customStyle={{
                backgroundColor: Global.GRAY,
                borderColor: Global.GRAY,
                borderRadius: 45,
                borderWidth: 2,
                padding: 5,
                opacity: 0.8,
              }}
              handlePress={() => {
                console.log("Opening settings");
                this.props.navigation.navigate("Settings");
              }}
            />
          </View>
        </SafeAreaView>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: "5%",
            paddingLeft: "5%",
            paddingRight: "5%",
            pointerEvents: "none",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              padding: 5,
            }}
          ></View>
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
                opacity: 0.9,
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

          <View>
            <ImageButton
              imageSource={require("../../assets/refresh.png")}
              width={50}
              height={50}
              customStyle={{
                backgroundColor: Global.WHITE,
                borderColor: Global.GRAY,
                borderRadius: 45,
                borderWidth: 2,
                padding: 5,
                opacity: 0.8,
              }}
              handlePress={() => {
                this.updateMapMarkers();
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
