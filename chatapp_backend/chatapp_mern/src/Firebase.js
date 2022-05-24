import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Ig_8yLB4WySiKyD874sC7mmQkHytH2U",
  authDomain: "chatapp-5d722.firebaseapp.com",
  databaseURL: "https://chatapp-5d722-default-rtdb.firebaseio.com",
  projectId: "chatapp-5d722",
  storageBucket: "chatapp-5d722.appspot.com",
  messagingSenderId: "615574468137",
  appId: "1:615574468137:web:07e2cd6f06650be1960e38",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// const db = firebaseApp.firestore();
const provider = new GoogleAuthProvider(firebaseApp);
// const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
// export default db;
