import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./FeedbackPage.css";
import FeedbackContact from "./FeedbackContact.jsx";
import FeedbackQuestions from "./FeedbackQuestions.jsx";
import FeedbackRadio from "./FeedbackRadio";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const FeedbackPage = () => {
  const location = useLocation();
  const [cookiess] = useCookies(["user_token"]);
  const [decodedToken, setDecodedToken] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    program: "",
    yearLevel: "",
    section: "",
  });

  const [questions, setQuestions] = useState({
    likeAboutNU: "",
    concernsAboutNU: "",
    additionalComments: "",
  });

  const [responses, setResponses] = useState({});

  const handleContactChange = (e) => {
    const { id, value } = e.target;
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
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
            Authorization: "Bearer " + cookiess.user_token,
          },
          withCredentials: true,
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
    navigate("/nud-hub/loginhome");
  };

  useEffect(() => {
    if (cookiess.user_token) {
      // If the user is logged in
      try {
        // Decode the token
        const decoded = jwtDecode(cookiess.user_token);
        setDecodedToken(decoded);

        axios
          .post(
            "http://localhost/nud-hub/API/apiCalls/read/readUserProfile.php",
            {
              user_id: decoded.user_id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(function (response) {
            console.log(response.data.data);
            setContactInfo((prevInfo) => ({
              ...prevInfo,
              firstName: response.data.data.f_name,
              lastName: response.data.data.l_name,
              email: response.data.data.email,
            }));
          }); // Read profile
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      // If guest user
      console.log("No token found, guest user");
    }
  }, [cookiess]);

  return (
    <>
      <div className="feedback-title">
        <h1 className="feedtitle">STUDENT FEEDBACK FORM</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <FeedbackContact
            handleChange={handleContactChange}
            contactInfo={contactInfo}
          />
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
        </div>

        <div>
          <FeedbackRadio
            handleChange={handleRadioChange}
            responses={responses}
          />
        </div>

        <div className="fsubmit-button">
          <button type="submit" className="custom-button">
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