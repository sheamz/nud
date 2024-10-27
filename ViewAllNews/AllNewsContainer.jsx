import React from "react";
import NewsItemTemplate from "./NewsItemTemplate";
import "./AllNewsContainer.css";
import Right from "../assets/right.png";
import Left from "../assets/left.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllNewsContainer({ comments }) {
  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = 5;
  const navigate = useNavigate();

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      navigate(`/nud-hub/ViewAllNewsPage`);
    }
  };

  // Function to go to the previous page
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      navigate(`/nud-hub/ViewAllNewsPage`);
    }
  };

  const startIndex = currentPage * commentsPerPage;
  const selectedComments = comments.slice(
    startIndex,
    startIndex + commentsPerPage
  );

  return (
    <div className="productReviewContainer-parentCont">
      <div className="commentsContainer">
        {selectedComments.map((comment, index) => (
          <NewsItemTemplate
            key={index}
            full_picture={comment.full_picture}
            title={comment.message}
            date={comment.created_time}
            location={comment.location}
            link={comment.permalink_url}
          />
        ))}
      </div>
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
    </div>
  );
}
