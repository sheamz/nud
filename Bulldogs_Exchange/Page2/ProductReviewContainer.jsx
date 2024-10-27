import React, { useState } from "react";
import CommentTemplate from "./commentTemplate.jsx";
import "./ProductReviewContainer.css";
import Right from "../../assets/right.png";
import Left from "../../assets/left.png";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";  // Import jwt-decode

export default function ProductReviewContainer({ comments, id, filter, setFilter, information }) {
  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = 7;
  const navigate = useNavigate();

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const [value, setValue] = useState(2);  // For rating
  const [commentText, setCommentText] = useState("");  // For comment text
  const [open, setOpen] = useState(false);
  const [submittedOpen, setSubmittedOpen] = useState(false);
  const [cookies] = useCookies(["user_token"]);  // For user authentication

  // Decode the user token to get the user ID
  const decodedToken = jwtDecode(cookies.user_token);
  const userId = decodedToken.user_id;  // Adjust based on your token structure

  const startIndex = currentPage * commentsPerPage;
  const selectedComments = comments.slice(
    startIndex,
    startIndex + commentsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      navigate(`/nud-hub/BeProductPage`);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      navigate(`/nud-hub/BeProductPage`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(true);  // Open confirmation dialog before submitting
  };

  const handleClose = (confirmed) => {
    setOpen(false);
    if (confirmed) {
      // Prepare data to send in the POST request
      const data = {
        comments: commentText,
        sender_id: userId,  // Use decoded user ID
        to_review: id,  // Replace with actual product ID
        rating: value,
      };

      // Axios POST request to insert comment
      axios
        .post("http://localhost/nud-hub/API/apiCalls/create/insertComment.php", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(function (response) {
          console.log(response.data);
          setSubmittedOpen(true);  // Open success dialog
        })
        .catch(function (error) {
          console.error("Error submitting comment:", error);
        });
    }
  };

  const handleSubmittedClose = () => {
    setSubmittedOpen(false);
    window.location.reload();
  };

  function handleFilterChanage(event){
    const value = event.target.getAttribute("value");
    setFilter(value);
  }

  return (
    <div className="productReviewContainer-parentCont">
      {/* Metrics Section */}
      <div className="row row-cols-3 metrics">
        <div className="col totalReviewCont">
          <p className="metricsTitle">Total Reviews</p>
          <p className="metricsCount">{information.total_review}</p>
          <p className="metricsSubtitle">Total reviews on this year</p>
        </div>
        <div className="col averageRatingCont">
          <p className="metricsTitle">Average Rating</p>
          <p className="metricsCount">{information.rating}</p>
          <p className="metricsSubtitle">Average rating on this year</p>
        </div>
        <div className="col barGraphCont">
          <div className="dropdown">
            <button className="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Filter Comments
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" value="new" onClick={handleFilterChanage}>Newest</a></li>
              <li><a className="dropdown-item" value="old" onClick={handleFilterChanage}>Oldest</a></li>
              <li><a className="dropdown-item" value="name" onClick={handleFilterChanage}>Name</a></li>
              <li><a className="dropdown-item" value="high" onClick={handleFilterChanage}>Highest Rating</a></li>
              <li><a className="dropdown-item" value="low" onClick={handleFilterChanage}>Lowest Rating</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form to submit a new comment */}
      <div className="filter-and-comment-container">
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col">
                  <h5 className="title">Leave a rating</h5>
                  <Box>
                    <Rating
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);  // Update rating value
                      }}
                    />
                  </Box>
                  <div className="form-floating">
                    <textarea 
                      className="form-control" 
                      placeholder="Leave a comment here" 
                      id="floatingTextarea"
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}  // Update comment text
                    />
                    <label htmlFor="floatingTextarea">Your Comment</label>
                  </div>
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Comments Display Section */}
      <div className="commentsContainer">
        {selectedComments.map((comment, index) => (
          <CommentTemplate
            key={index}
            name={comment.f_name + " " + comment.l_name}
            rating={comment.rating}
            date={comment.created_at.split(" ")[0]}
            comment={comment.comments}
            profile_picture={comment.profile_picture}
          />
        ))}
      </div>

      {/* Pagination Section */}
      <div className="nextPageInput">
        <img
          src={Left}
          alt="left arrow"
          onClick={handlePrevious}
          style={{
            cursor: currentPage === 0 ? "not-allowed" : "pointer",
            opacity: currentPage === 0 ? 0.5 : 1,
            height: "30px",
            marginTop: "-10px",
          }}
        />
        <p
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingTop: "10px",
          }}
        >
          Page {currentPage + 1} of {totalPages}
        </p>
        <img
          src={Right}
          alt="right arrow"
          onClick={handleNext}
          style={{
            cursor: currentPage === totalPages - 1 ? "not-allowed" : "pointer",
            opacity: currentPage === totalPages - 1 ? 0.5 : 1,
            height: "30px",
            marginTop: "-10px",
          }}
        />
      </div>

      {/* Confirmation Dialog for submitting comment */}
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle>Submit Comment</DialogTitle>
        <DialogContent>
          Are you sure you want to submit this comment?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog after comment submission */}
      <Dialog open={submittedOpen} onClose={handleSubmittedClose}>
        <DialogTitle>Comment Submitted</DialogTitle>
        <DialogContent>
          Your comment has been successfully submitted.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmittedClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}