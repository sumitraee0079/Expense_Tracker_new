import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBKVhkzwfhE7T_ZgQReRW1glAYugehXCBs",
  authDomain: "auth-demo-bbd34.firebaseapp.com",
  projectId: "auth-demo-bbd34",
  storageBucket: "auth-demo-bbd34.appspot.com",
  messagingSenderId: "670791494398",
  appId: "1:670791494398:web:8efc15d3ffc5d16002d3af"
})

export const auth = app.auth()
//export const db = app.firestore()

var db = app.firestore();

export { db };
export default app