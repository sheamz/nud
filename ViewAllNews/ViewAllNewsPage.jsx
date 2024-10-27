import React, { useState } from "react";
import "./ViewAllNewsPage.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AllNewsContainer from "./AllNewsContainer.jsx";
import news1 from "../assets/images/news_1.png";
import FeaturedNewsTemplate from "../Pages/FeaturedNewsTemplate.jsx";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function NewsCard(props) {
  const date = new Date(props.data.created_time);

  return (
    <div className="col" key={props.data.id}>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.data.full_picture ?? news1}
              className="img-fluid rounded-start"
              alt="image from page"
              style={{ maxHeight: "120px" }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <p className="card-date">
                <small>{date.toDateString()}</small>
              </p>
              <p className="card-text">{props.data.message}</p>
              <p className="text-end m-0 align-bottom">
                <a
                  className="card-text text-decoration-none text-secondary view-orig"
                  href={props.data.permalink_url}
                  target="_blank"
                >
                  View Original Post
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    style={{ marginLeft: "5px" }}
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ViewAllNewsPage() {
  const location = useLocation();
  const [fbData, setFbData] = useState([]);
  const [moreNews, setMoreNews] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // feed limit 2
    axios
      .get(
        "https://graph.facebook.com/v21.0/me?fields=feed.limit(4){message,full_picture,permalink_url,created_time,comments}&access_token=EAB8tbtEZAnssBO2KYPN3jlxkUypeYQFoNsmxEtzasE9AJfg33TOOrKns3EykMuDfHND4I1Kl1nsbgbWLEXHEwZBgEMZA6QW9buL8rkBxi4WeTExDgOZBnfFddqwe4CZB6Vk51YWx7AJ7YoG2ZARPY4QZByhYOCfI07bsTrJ1ApVXtvvTjeoDUf1PXoSrSLK2pOg"
      )
      .then((res) => {
        // console.log(res.data.data);
        setFbData(res.data.feed.data);
        setFeatured(res.data.feed.data);
        // console.log(res.data.data[0].comments.data);
      })
      .catch();

    // feed limit no
    axios
      .get(
        "https://graph.facebook.com/v21.0/me/feed?fields=message%2Cfull_picture%2Cpermalink_url%2Ccreated_time%2Ccomments&access_token=EAB8tbtEZAnssBO2KYPN3jlxkUypeYQFoNsmxEtzasE9AJfg33TOOrKns3EykMuDfHND4I1Kl1nsbgbWLEXHEwZBgEMZA6QW9buL8rkBxi4WeTExDgOZBnfFddqwe4CZB6Vk51YWx7AJ7YoG2ZARPY4QZByhYOCfI07bsTrJ1ApVXtvvTjeoDUf1PXoSrSLK2pOg"
      )
      .then((res) => {
        // console.log(res.data.data);
        setMoreNews(res.data.data);
        // console.log(res.data.data[0].comments.data);
      })
      .catch();
  }, []);


  return (
    <>
      <div className="latestnews">
        <h4 className="latestnews-title">LATEST NEWS</h4>

        <div className="row row-cols-1 row-cols-md-2 g-2">
          {fbData.map((data, index) => {
            return (
              <NewsCard
                key={index}
                data={fbData[index]}
                com={fbData[index].comments}
              />
            );
          })}
        </div>
      </div>

      <hr className="border border-1 opacity-100" />

      <div className="more-news-container">
        <h4 className="news-title">MORE NEWS</h4>

        <div className="row">
          <div className="col-8">
            <AllNewsContainer comments={moreNews} />
          </div>

          <div className="col-4">
            <FeaturedNewsTemplate news={featured} />
          </div>
        </div>
      </div>
    </>
  );
}
