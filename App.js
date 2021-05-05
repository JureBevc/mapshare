import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MapScreen from "./app/screens/MapScreen";
import LoginScreen from "./app/screens/LoginScreen";
import LoadingScreen from "./app/screens/LoadingScreen";
import firebase from "firebase";
import { firebaseConfig } from "./config";
import CameraScreen from "./app/screens/CameraScreen";
firebase.initializeApp(firebaseConfig);

const Navigator = createStackNavigator({
  Loading: {
    screen: LoadingScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Map: {
    screen: MapScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Camera: {
    screen: CameraScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const App = createAppContainer(Navigator);

export default App;
