import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MapScreen from "./app/screens/MapScreen.js";
import LoginScreen from "./app/screens/LoginScreen.js";

const Navigator = createStackNavigator({
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
});

const App = createAppContainer(Navigator);

export default App;
