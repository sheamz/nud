import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Feedback/FeedbackPage.css";
import FeedbackQuestions from "../Feedback/FeedbackQuestions.jsx";
import FeedbackRadio from "../Feedback/FeedbackRadio";
import logo from "../assets/images/NU White Full Logo.png";
import search from "../assets/images/Search.png";
import "../assets/css/NavigationBar.css";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const FeedbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const backtohome = () => {
    navigate("/nud-hub/homepage");
  };

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [questions, setQuestions] = useState({
    likeAboutNU: "",
    concernsAboutNU: "",
    additionalComments: "",
  });

  const [responses, setResponses] = useState({});

  const handleContactChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setContactInfo((values) => ({ ...values, [name]: value }));
  };

  const handleQuestionsChange = (e) => {
    const { id, value } = e.target;
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [id]: value,
    }));
  };

  const handleRadioChange = (questionIndex, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      f_name: contactInfo.firstName,
      l_name: contactInfo.lastName,
      email: contactInfo.email,
      phone: contactInfo.phone,
      response: [
        { question_id: 1, response: questions.likeAboutNU },
        { question_id: 2, response: questions.concernsAboutNU },
        { question_id: 9, response: questions.additionalComments },
        ...Object.keys(responses).map((key, index) => ({
          question_id: index + 3,
          response: responses[key],
        })),
      ],
    };
    console.log("Form submitted", formData);

    axios
      .post(
        "http://localhost/nud-hub/API/apiCalls/create/insertFeedback.php",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        setOpenDialog(true); // Show dialog on success
      })
      .catch(function (error) {
        console.error("Error submitting feedback:", error);
      });
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    navigate("/nud-hub/homepage");
  };

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            onClick={backtohome}
            style={{ cursor: "pointer" }}
          >
            <img
              src={logo}
              alt="Logo"
              width="242"
              height="42.35"
              className="d-inline-block align-text-top"
            ></img>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav"></ul>

            {/* Search Bar  */}
            <div className="d-flex">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                ></input>
                <span className="input-group-text">
                  <img
                    src={search}
                    height="20"
                    width="20"
                    alt="Search Icon"
                  ></img>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="feedback-title">
        <h1
          className="feedtitle"
          style={{
            marginTop: "70px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          FEEDBACK FORM
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <div className="feedback-contact">
            <div className="contact-title">
              <h1 className="contitle">CONTACT INFORMATION</h1>
            </div>

            <div className="contact-input">
              <div className="input-row">
                <div className="input-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGroup1"
                      placeholder="First Name"
                      name="firstName"
                      value={contactInfo.firstName}
                      onChange={handleContactChange}
                    />
                    <label htmlFor="floatingInputGroup1">First Name</label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGroup2"
                      placeholder="Last Name"
                      name="lastName"
                      value={contactInfo.lastName}
                      onChange={handleContactChange}
                    />
                    <label htmlFor="floatingInputGroup2">Last Name</label>
                  </div>
                </div>
              </div>

              <div className="input-row">
                <div className="input-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGroup3"
                      placeholder="Email Address"
                      name="email"
                      value={contactInfo.email}
                      onChange={handleContactChange}
                    />
                    <label htmlFor="floatingInputGroup3">Email Address</label>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInputGroup4"
                      placeholder="Phone Number"
                      name="phone"
                      value={contactInfo.phone}
                      onChange={handleContactChange}
                    />
                    <label htmlFor="floatingInputGroup4">Phone Number</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider-line"></div>

        <div className="question-title">
          <h1 className="q-title">FEEDBACK QUESTIONS</h1>
        </div>

        <div>
          <FeedbackQuestions
            handleChange={handleQuestionsChange}
            questions={questions}
          />
          <FeedbackRadio
            handleChange={handleRadioChange}
            responses={responses}
          />
        </div>

        <div className="fsubmit-button">
          <button
            type="submit"
            className="custom-button"
            style={{ marginBottom: "70px" }}
          >
            Submit
          </button>
        </div>
      </form>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'ClanOT-Black' }}>
          {"Feedback Submitted"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontFamily: 'ClanOT-Book' }}>
            Thank you for your feedback! Your response has been successfully submitted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" sx={{ fontFamily: 'ClanOT-Bold' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FeedbackPage;