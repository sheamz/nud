import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Welcome from "./Welcome";
import News from "./News";
import "../assets/css/Body.css";
import StudentSystem from "./StudentSystem";
import Bulldogs from "./Bulldogs";
import Calendar from "./Calendar";
import Feedback from "./Feedback";
import Maps from "./Maps";
import Footer from "./Footer";
import axios from "axios";

function Homepage() {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);

  const handleLogin = () => {
    navigate("/login");
  };
  useLayoutEffect(() => {
    document.title = "NU-D Hub";
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://graph.facebook.com/v21.0/me/feed?fields=message%2Cfull_picture%2Cpermalink_url%2Ccreated_time%2Ccomments&access_token=EAB8tbtEZAnssBO2KYPN3jlxkUypeYQFoNsmxEtzasE9AJfg33TOOrKns3EykMuDfHND4I1Kl1nsbgbWLEXHEwZBgEMZA6QW9buL8rkBxi4WeTExDgOZBnfFddqwe4CZB6Vk51YWx7AJ7YoG2ZARPY4QZByhYOCfI07bsTrJ1ApVXtvvTjeoDUf1PXoSrSLK2pOg"
      )
      .then((res) => {
        // console.log(res.data.data);
        setNewsData(res.data.data);
        // console.log(res.data.data[0].comments.data);
      })
      .catch();
  });

  const nuNews = [
    {
      title: "NU-D IT Department Introduces Free Coding Workshops",
      content:
        "The IT Department is oddddffering free coding workshops for students interested in learning programming languages such as JavaScript and HTML. These workshops are designed to prepare students for tech-driven careers.",
      date: "26 Aug 2024",
    },
    {
      title: "NU Manila",
      content: "NU Manila is the bdddest!",
      date: "09/26/2024",
    },
    {
      title: "NU Laguna",
      content: "NU Laguna is the best!",
      date: "09/27/2024",
    },
    {
      title: "NU Cavite",
      content: "NU Cavite is the best!",
      date: "09/28/2024",
    },
    {
      title: "NU-D IT Department Introduces Free Coding Workshops",
      content:
        "The IT Department is oddddffering free coding workshops for students interested in learning programming languages such as JavaScript and HTML. These workshops are designed to prepare students for tech-driven careers.",
      date: "26 Aug 2024",
    },
    {
      title: "NU Manila",
      content: "NU Manila is the bdddest!",
      date: "09/26/2024",
    },
  ];
  return (
    <>
      <div className="main">
        <div id="Home"></div>
        {/* Navigation Bar Start */}
        <NavigationBar></NavigationBar>
        {/* Navigation Bar End */}

        {/* Body Start */}
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-offset="0"
          class="scrollspy-example"
          tabindex="0"
          style={{ overflowX: "hidden" }}
        >
          <div class="welcome-and-student">
            {/* Welcome Start */}
            <Welcome></Welcome>
            {/* Welcome End  */}
            {/* Studuent System Start */}
            <StudentSystem></StudentSystem>
            {/* Studuent System End */}
          </div>

          {/* News Start */}
          <News data={newsData}></News>

          {/* News End */}

          {/* Bulldog Exchange start */}

          <Bulldogs></Bulldogs>
          {/* Bulldogs Exchange End */}

          {/* University Calendar Start */}
          <Calendar></Calendar>
          {/* University Calendar End */}

          {/* Maps Start */}
          <Maps></Maps>
          {/* Maps End */}

          {/* Feed Back */}
          <Feedback></Feedback>
          {/* Feed Back End */}
        </div>

        {/* Footer */}
        <Footer></Footer>
        {/* Footer End */}
      </div>
      {/* Body End */}
    </>
  );
}

export default Homepage;
