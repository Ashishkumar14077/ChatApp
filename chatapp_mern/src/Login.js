import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./Firebase.js";
import {
  signInWithPopup,
  getRedirectResult,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  //for data layer
  const [{}, dispatch] = useStateValue();
  const SignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));

    /*signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
          token: credential.accessToken,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      */
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/220/220236.png"
          alt=""
        />
        <div className="login__text">
          <h1>Signin to Whatsapp</h1>
        </div>
        <Button onClick={SignIn}>Signin with Google</Button>
      </div>
    </div>
  );
}

export default Login;
