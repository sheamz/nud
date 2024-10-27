import React from "react";
import "../assets/css/NewsTemplate.css";
import news from "../assets/news.png";

export default function NewsTemplate({ title, content, date, full_picture }) {
  return (
    <>
      <div className="NewsTemplate-news1">
        <img
          src={full_picture}
          alt="NU news"
          className="newsImage"
          style={{
            width: "90%",
            height: "25vh",
            margin: "auto",
            objectFit: "cover",
            borderRadius: "10px",
            overflow: "hidden",
            // border: "1px solid red",
          }}
        />
        <div className="NewsTemplate-news-content1">
          {/* <h1
            style={{
              fontFamily: "ClanOT-Black",
              lineHeight: "1",
              fontSize: "20px",
              letterSpacing: "0.9",
            }}
          >
            {title}
          </h1> */}
          <p
            style={{
              fontFamily: "ClanOT-Book",
              lineHeight: "1.2",
              color: "black",
              marginTop: "15px",
            }}
          >
            {content}
          </p>
          <p
            style={{
              fontSize: "13px",
              color: "gray",
            }}
          >
            {date}
          </p>
        </div>
      </div>
    </>
  );
}
