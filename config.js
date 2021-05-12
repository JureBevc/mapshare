import firebase from "firebase";
import { LogBox } from "react-native";

var firebaseConfig = {
  apiKey: "AIzaSyAtcs2uX2glfVzw8hhk_Zrn-8gnf5vhuLo",
  authDomain: "mapshare-5fed8.firebaseapp.com",
  databaseURL:
    "https://mapshare-5fed8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mapshare-5fed8",
  storageBucket: "mapshare-5fed8.appspot.com",
  messagingSenderId: "961970114032",
  appId: "1:961970114032:web:dee72347d5afc8206d6135",
  measurementId: "G-SHVC6X8MZ8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
firebase.setLogLevel("silent");

export const db = firebase.database();

LogBox.ignoreLogs(["Setting a timer"]);
