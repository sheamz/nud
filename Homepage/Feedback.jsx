import React, { useState, useEffect } from "react";
import "../assets/css/Feedback.css";
import feedbackpic from "../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Feedback() {
  const [feedbackUser, setFeedbackUser] = useState([]);
  const [feedbackGuest, setFeedbackGuest] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/NUD-HUB/api/apiCalls/read/readFeedbackUser.php")
      .then(function (response) {
        console.log("this is the feedback of users", response.data.data);
        setFeedbackUser(response.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost/NUD-HUB/api/apiCalls/read/readFeedbackGuest.php")
      .then(function (response) {
        console.log("this is the feedback of guests ", response.data.data);
        setFeedbackGuest(response.data.data);
      });
  }, []);

  const maskFirstName = (name) => {
    if (!name) return "";
    return name.charAt(0) + "*".repeat(name.length - 1);
  };

  const navigate = useNavigate();
    
  const sendFeedback = () => {
    window.scrollTo(0, 0);
    navigate("/nud-hub/guestfeedback");
  };

  return (
    <>
      <div
        className="startcontact"
        id="Contact"
        style={{ marginBottom: "240px" }}
      ></div>
      <div
        className="row feedback"
        style={{ marginLeft: "0", width: "100%", textAlign: "center" }}
      >
        <div className="sendfeedback">
          <p className="upper">
            We love to hear suggestions from you Nationalians
          </p>
          <button className="lower" onClick={sendFeedback}>
            Send us your Feedback
            <i
              className="fas fa-comment-alt"
              style={{ marginLeft: "20px" }}
            ></i>
          </button>
        </div>

        <div
          className="row feedback_pic"
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "0",
            width: "100%",
            textAlign: "center",
            marginTop: "10%",
            marginBottom: "10%",
          }}
        >
          <div className="cards-container">
            {feedbackUser.slice(0, 3).map((feedback, key) => (
              <div className="card mb-3 h-100" key={key}>
                <img src={feedbackpic} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{maskFirstName(feedback.f_name)}</h5>
                  <p className="card-text">{feedback.content}</p>
                </div>
              </div>
            ))}

            {feedbackGuest.slice(0, 3).map((feedback, key) => (
              <div className="card mb-3 h-100" key={key}>
                <img src={feedbackpic} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{maskFirstName(feedback.f_name)}</h5>
                  <p className="card-text">{feedback.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;