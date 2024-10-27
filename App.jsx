import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Homepage from "./Homepage/Homepage.jsx";
import Login from "./Login/Login.jsx";
import MainPage from "./Pages/MainPage.jsx";
import LoginHome from "./LoginHome/Home.jsx";
import Profile from "./Pages/Profile.jsx";
import FeedbackPage from "./Homepage/FeedbackPage.jsx";
import "./assets/css/App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <>
  
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/nud-hub/homepage" element={<Homepage />} />
          <Route path="/nud-hub/loginhome" element={<LoginHome />} />
          <Route path="/nud-hub/profile" element={<Profile />} />
          <Route path="/nud-hub/guestfeedback" element={<FeedbackPage />} />
          <Route path="/nud-hub/BulldogExchange" element={<MainPage />} />
          <Route path="/nud-hub/FeedbackPage" element={<MainPage />} />
          <Route path="/nud-hub/BeProductPage" element={<MainPage />} />
          <Route path="/nud-hub/UniversityMap" element={<MainPage />} />
          <Route path="/nud-hub/ViewAllNewsPage" element={<MainPage />} />
          <Route path="/nud-hub/ViewAllEventPage" element={<MainPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
