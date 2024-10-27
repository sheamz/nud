import React from "react";
import "./NewsItemTemplate.css";
import news1 from "../assets/images/news_1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function NewsItemTemplate({
  dateBox,
  title,
  date,
  location,
  link,
  full_picture,
}) {
  let dateFormat = new Date(date);

  return (
    <div className="eventItemTemplate-parentCont">
      {/* Image Section */}

      <div className="image-container">
        <img
          className=""
          src={full_picture ?? news1}
          style={{
            borderRadius: "15px",
            height: "120px",
            width: "250px",
            objectFit: "cover",
          }}
        ></img>
        <></>
      </div>

      {/* News Details Section */}
      <div className="newsContent">
        <p className="newsDate">{dateFormat.toDateString()}</p>
        <p className="newsTitle">{title ?? "untitled"}</p>
        <a href={link} target="_blank">
          <button className="viewPost">
            View Full Post
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ marginRight: "5px" }}
            />
          </button>
        </a>
      </div>
    </div>
  );
}
