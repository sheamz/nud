import React, { useState } from "react";
import "./Login_Form.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login_Google from "./Login_Google.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import nud from "../assets/images/NUD Building 2.jpg";


export default function Login_Form() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setLogin((login) => ({
      ...login,
      [event.target.name]: event.target.value,
    }));
  };



  const handleClick = () => {
    navigate("/nud-hub/homepage");
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("http://localhost/nud-hub/API/login_user.php/", login, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        if (response.data === "Success") {
          navigate("/nud-hub/loginhome");
        } else {
          alert("Failed");
        }
      })
      .catch((error) => console.log(error));
  }



  return (
    <>
      <div className="cont">
          <div className="row">
            <div className="col-6">
              <div className="imageContainer">
                <img src={nud} alt="NU-D Hub" className="formimage" />
              </div>
            </div>

            <div className="col-6 text">
              <h2 className="title">Welcome to NUD Hub</h2>
              <p className="subtitle">
                The NU-D Hub system offers real-time updates on Bulldogs Exchange, a
                feedback platform, event calendars, and access to exclusive promos
                for NU Dasmariñas students, faculty, and staff.
              </p>

              <hr className="border border-custom border-1 opacity-90" />
              

              <div className="d-grid gap-2 sizing">
                <div>
                  <Login_Google />
                </div>
              </div>

              <div className="button-container">
                <button className="btn btn-primary" onClick={handleClick}>
                  Continue as Guest
                </button>
              </div>

            </div>

          </div>
      </div>
    </>
  );
}
