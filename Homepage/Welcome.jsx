import React from "react";
import building from "../assets/images/nud-welcome.png";
import { useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome


function Welcome(){
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/');
  };


    return (
    <>
        <div className="row">
          <div className="col-12">
          <div id="carouselWelcome" className="carousel slide" style={{ position: 'relative', width: '100%', height: '550px'}}>
            <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselWelcome"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselWelcome"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselWelcome"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            </div>

            <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={building} className="d-block w-100" alt="..." style={{ height: '550px', objectFit: 'cover'}}></img>
              <div className="welcome-text" style={{ position: 'absolute', top: '125px', left: '100px', color: '#35408E'}}>
                <h5 style={{ fontSize: '70px', fontFamily: 'ClanOT-Black', lineHeight: '0.9', letterSpacing: '-1px'}}>
                  NUD Hub<br></br>got it all.
                </h5>
                <p style={{ width: '400px', fontSize: '15px', lineHeight: '1.2', marginTop: '25px', color: 'white'}}>
                  The NUD Hub system offers real-time updates on numerous services.
                </p>
              </div>
                <button
                  className="btn btn-primary"
                  style={{
                    position: 'absolute',
                    top: '330px',
                    left: '100px',
                    backgroundColor: '#ffd41c',
                    border: 'none',
                    color: '#35408E',
                    padding: '12px 30px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                    fontSize: '15px'
                  }}
                  onClick={handleSignInClick}
                >
                Sign in
                <i className="fas fa-sign-in-alt" style={{ marginLeft: '10px' }}></i>
              </button>
            </div>

            <div className="carousel-item">
              <img src="..." className="d-block" alt="..."></img>
              <div className="carousel-caption" style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }}>
              <h5>Another Slide</h5>
              <p>Some description text here</p>
              </div>
            </div>
            
            <div className="carousel-item">
              <img src="..." className="d-block" alt="..."></img>
              <div className="carousel-caption" style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }}>
              <h5>Yet Another Slide</h5>
              <p>Some description text here</p>
              </div>
            </div>
            </div>

          </div>
          </div>
        </div>

        <div className="announcement" style={{marginLeft: '0'}}>
          <div className="row" style={{backgroundColor: '#35408E'}}>
            <div className="col-2" style={{backgroundColor: '#EDEDED', color: '#35408E'}}>
            <i className="fas fa-info-circle" style={{ marginRight: '10px'}}></i>
            Announcement
            </div>

            <div className="col-10" style={{paddingLeft: '0px', marginLeft:'0' }}>
              <p className="title" style={{color: 'white', overflow: 'hidden', whiteSpace: 'nowrap'}}>
              <span className="announcement-text">The NU-D Hub system offers real-time updates on Bulldogs Exchange, a feedback platform, event calendars, and access to exclusive promos for NU Dasmariñas students, faculty, and staff.</span>
            </p>
            </div>

          </div>
        </div>

        <div className="schools-container">
          <ul className="nav nav-pills mb-3 justify-content-center" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">School of Engineering, Computing, and Architecture</button>
            </li>
            <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">School of Arts, Sciences, and Education</button>
            </li>
            <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">School of Business, Management, and Accountancy</button>
            </li>
            <li className="nav-item" role="presentation">
            <button className="nav-link" id="pills-shs-tab" data-bs-toggle="pill" data-bs-target="#pills-shs" type="button" role="tab" aria-controls="pills-shs" aria-selected="false">Senior High School</button>
            </li>
          </ul>
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
            <ul>
              <li>Computer Science</li>
              <li>Information Technology</li>
              <li>Architecture</li>
              <li>Engineering</li>
            </ul>
          </div>
          <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
            <ul>
              <li>Psychology</li>
              <li>Biology</li>
              <li>Education</li>
              <li>Communication</li>
            </ul>
          </div>
          <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
            <ul>
              <li>Business Administration</li>
              <li>Accountancy</li>
              <li>Marketing</li>
              <li>Management</li>
            </ul>
          </div>
          <div className="tab-pane fade" id="pills-shs" role="tabpanel" aria-labelledby="pills-shs-tab" tabIndex="0">
            <ul>
              <li>STEM</li>
              <li>ABM</li>
              <li>HUMSS</li>
              <li>GAS</li>
            </ul>
          </div>
        </div>
        </div>
    </>
    )
}

export default Welcome;