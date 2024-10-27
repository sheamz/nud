import React from "react";
import "./Login.css";
import Login_Form from "./Login_Form.jsx";
import logo from "../assets/images/NU-logo.png";

export default function Login() {
  return (
    <>
      <div className="parentCont">
        <img src={logo} alt="logo image" className="backgroundImage" />
        <div className="topContainer">
          <div className="logoTextContainer">
            <img src={logo} alt="NU Logo" className="logoImage" />
            <h3>NU DASMARIÑAS</h3>
          </div>
        </div>

        <div className="loginCont">
          <Login_Form />
        </div>
      </div>
    </>
  );
}
