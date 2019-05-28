import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPLgxpSBXMg_T38--_fJkHRUBQSuudBQY",
  authDomain: "osvit-matija",
  databaseURL: "https://osvit-matija.firebaseio.com",
  storageBucket: "gs://osvit-matija.appspot.com",
  projectId: "osvit-matija"
};

firebase.initializeApp(firebaseConfig);

const firebaseWithConfig = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const FirebaseAuth = firebaseWithConfig.auth();
export const FirebaseDatabase = firebaseWithConfig.firestore();
