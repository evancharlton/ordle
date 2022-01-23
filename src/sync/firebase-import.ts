import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCRm1TLpwpKcWcRjeDqf0kDFSewHhed64k",
  authDomain: "ordle-app.firebaseapp.com",
  projectId: "ordle-app",
  storageBucket: "ordle-app.appspot.com",
  messagingSenderId: "353830244483",
  appId: "1:353830244483:web:01558dc0a7c1af0afd8bb6",
  databaseURL:
    "https://ordle-app-default-rtdb.europe-west1.firebasedatabase.app",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
