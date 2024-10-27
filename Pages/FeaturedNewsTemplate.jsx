import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/FeaturedNewsTemplate.css";
import NewsContent from "./NewsTemplate.jsx";
import NextPageL from "../assets/NextPageL.png";
import NextPageR from "../assets/NextPageR.png";
import Facebook from "../assets/Facebook.png";
import Youtube from "../assets/Youtube.png";
import AdvertisementPage from "../assets/AdvertisementPage.png";

export default function FeaturedNewsTemplate({ news }) {
  const [currentPage, setCurrentPage] = useState(0);
  const newsPerPage = 1;
  const navigate = useNavigate();

  const totalPages = Math.ceil(news.length / newsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * newsPerPage;
  const NUnews = news.slice(startIndex, startIndex + newsPerPage);

  return (
    <>
      <div className="FeaturedNewsTemplate-parentCont1">
        <div className="FeaturedNewsTemplate-cont1">
          <div className="FeaturedNewsTemplate-header1">
            <p>FEATURED NEWS</p>
          </div>
          {NUnews.map((news, index) => (
            <NewsContent
              key={index}
              title={news.message}
              content={news.message}
              date={news.date}
              full_picture={news.full_picture}
            />
          ))}

          <div
            className="FeaturedNewsTemplate-pageButtons1"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "20px",
              paddingTop: "0",
            }}
          >
            <img
              src={NextPageL}
              alt="buttons"
              onClick={handlePrevious}
              className="pageButtonL1"
              style={{
                cursor: currentPage === 0 ? "not-allowed" : "pointer",
                opacity: currentPage === 0 ? 0.5 : 1,
                height: "30px",
              }}
            />
            <img
              src={NextPageR}
              alt="buttons"
              onClick={handleNext}
              className="pageButtonR1"
              style={{
                cursor:
                  currentPage === totalPages - 1 ? "not-allowed" : "pointer",
                opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                height: "30px",
              }}
            />
          </div>
        </div>

        <div className="FeaturedNewsTemplate-followUs1">
          <h1>FOLLOW US</h1>
          <p>Stay updated on our breaking news and latest updates!</p>
          <div className="FeaturedNewsTemplate-fb1">
            <img src={Facebook} alt="facebook" className="facebook" />
            <a
              href="https://www.facebook.com/NUDasmaPH"
              style={{
                textDecoration: "none",
                color: "white",
                textShadow: "1px 1px 3px gray",
              }}
            >
              NU Dasmarinas
            </a>
          </div>
          <div className="FeaturedNewsTemplate-yt1">
            <img src={Youtube} alt="youtube" className="youtube" />
            <a
              href="https://www.youtube.com/@NationalUniversityPhilippines"
              style={{
                textDecoration: "none",
                color: "white",
                textShadow: "1px 1px 3px gray",
              }}
            >
              NU Philippines
            </a>
          </div>
          <br></br>
          <p> We'd love to hear suggestions from you Nationalian! </p>

          <div className="button-container">
            <button
              className="FeaturedNewsTemplate-sendFeedback1"
              onClick={() => {
                window.scrollTo(0, 0); // Scroll to the top of the page
                navigate("/nud-hub/FeedbackPage");
              }}
            >
              Send Feedback
              <i className="fas fa-comment-dots advertisement1"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
