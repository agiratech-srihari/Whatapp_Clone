import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "./firebase";
import "./Login.css";
import { useStatevalue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStatevalue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="Whatsapp Logo"
        />
        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>

        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
