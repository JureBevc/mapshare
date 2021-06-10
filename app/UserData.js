import { db } from "../config";
import firebase from "firebase";

class UserData {
  static initialLocation = null;
  static location = null;

  static updateUserPreferences = (user) => {
    let displayName = user.displayName;
    let photoURL = user.photoURL;

    console.log("Uploading user data");
    console.log(displayName);
    console.log(photoURL);
    try {
      const usersRef = db.ref("users/" + user.uid);

      usersRef.set({
        displayName: displayName,
        photoURL: photoURL,
      });
    } catch (err) {
      console.log("ERROR UPLOADING USER");
      console.error(err);
    }
  };
}

export default UserData;
