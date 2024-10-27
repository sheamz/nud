import React from "react";
import "../assets/css/MainPage.css";
import Footer from "../Homepage/Footer";
import FCategory from "../Bulldogs_Exchange/Page1/FeaturedCategories.jsx";
import BeProduct from "../Bulldogs_Exchange/Page2/beProductPage.jsx";
import ViewAllEventPage from "../ViewAllEvents/ViewAllEventPage.jsx";
import ViewAllNewsPage from "../ViewAllNews/ViewAllNewsPage.jsx";
import MapPage from "./MapPage.jsx";
import FeedbackPage from "../Feedback/FeedbackPage.jsx";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from "../LoginHome/AppBarComponent.jsx";

const MainPage = () => {
  const location = useLocation();
  let content;
  const navigate = useNavigate();

  switch (location.pathname) {
    case '/nud-hub/BulldogExchange':
      content = (
        <>
          <div>
            <FCategory />
          </div>
        </>
      );
      break;

    case '/nud-hub/BeProductPage':
      content = (
        <div>
          <BeProduct />
        </div>
      );
      break;

    case '/nud-hub/ViewAllEventPage':
      content = (
        <div>
          <ViewAllEventPage />
        </div>
      );
    break;

    case '/nud-hub/ViewAllNewsPage':
    content = (
      <div>
        <ViewAllNewsPage />
      </div>
    );
    break;

    case '/nud-hub/UniversityMap':
    content = (
      <div>
        <MapPage />
      </div>
    );
    break;

    case '/nud-hub/FeedbackPage':
    content = (
      <div>
        <FeedbackPage />
      </div>
    );
    break;

    default:
      content = <div>Default Content</div>;
      break;
  }

  return (
    <>
      <AppBarComponent />

      <div className="content" style={{padding:'80px'}}>
        {content}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default MainPage;