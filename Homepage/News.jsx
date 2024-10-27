import React, { useState } from "react";
import news1 from "../assets/images/news_1.png";
import logo from "../assets/logo.png";
import gojo from "../assets/images/gojo.jpg";
import nulogo from "../assets/images/NU-logo.png";
import "../assets/css/News.css";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import HpNewsTemplate from "../ViewAllNews/hpNewsTemplate";

function HpNewsTemplate(props) {
  let dateFormat = new Date(props.data.created_time);

  return (
    <div class="card" style={{ width: "44%", height: '250px' }}>
      <div class="card-body">
        <div className="row">
          <div className="col image">
            <img
              src={props.data.full_picture ?? nulogo}
              class="d-block"
              style={{
                borderRadius: "15px",
                height: "200px",
                width: "210px",
                objectFit: "cover",
              }}
            ></img>
          </div>
          <div className="col-7 detail">
            <p className="card-date" style={{color: '#FFD41C'}}>{dateFormat.toDateString()}</p>
            {/* <p class="card-title">{props.data.}</p> */}
            <p className="card-text" style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 5, // Adjust the number of lines as needed
              WebkitBoxOrient: 'vertical'
            }}>
              {props.data.message}
            </p>
            <a href={props.data.permalink_url} target="_blank">
              <button className="viewPost">
                View Full Post
                <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ marginLeft: "5px" }}
                  />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function News(props) {
  const navigate = useNavigate();

  // -----------
  const [currentPage, setCurrentPage] = useState(0);
  const commentsPerPage = 4;

  const totalPages = Math.ceil(props.data.length / commentsPerPage);

  // console.log(props.data.length);

  // Function to go to the next page
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      navigate(`/nud-hub/homepage`);
    }
  };

  // Function to go to the previous page
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      navigate(`/nud-hub/homepage`);
    }
  };

  const startIndex = currentPage * commentsPerPage;
  const selectedComments = props.data.slice(
    startIndex,
    startIndex + commentsPerPage
  );

  return (
    <>
      <div className="startnews" id="News"></div>
      <div className="row news" style={{ marginLeft: "0" }}>
        <div className="news-content">
          <div className="row" style={{ width: "100%", marginLeft: 0 }}>
            <div className="col-12">
              <h4>University News</h4>
            </div>
          </div>

          <div
            id="carouselExampleIndicators"
            class="carousel slide"
          >
            <div class="carousel-inner">
              {/* Pages */}
              <div class="carousel-item active">
                <div
                  class="row g-1"
                  style={{ marginLeft: "0%", justifyContent: "center" }}
                >
                  {/* Cards */}
                  {selectedComments.map((data, index) => (
                    <HpNewsTemplate key={index} data={data} />
                  ))}
                </div>
              </div>
            </div>
            {/* Page End */}

            <div className="nextPageInput">
              <ArrowBackIosNewRoundedIcon
                onClick={handlePrevious}
                style={{
                  cursor: currentPage === 0 ? "not-allowed" : "pointer",
                  opacity: currentPage === 0 ? 0.5 : 1,
                  color: "#F5C400",
                }}
              />
              <p className="px-3 d-inline text-light">
                Page {currentPage + 1} of {totalPages}
              </p>
              <ArrowForwardIosRoundedIcon
                onClick={handleNext}
                style={{
                  cursor:
                    currentPage === totalPages - 1 ? "not-allowed" : "pointer",
                  color: "#F5C400",
                  opacity: currentPage === totalPages - 1 ? 0.5 : 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
