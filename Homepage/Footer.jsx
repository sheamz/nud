import React from "react";
import phone from "../assets/phone.png";
import location from "../assets/location.png";
import mail from "../assets/mail.png";
import schedule from "../assets/schedule.png";
import Footerlogo from "../assets/NUFooterLogo.png";
import '../assets/css/Footer.css'

function Footer (){
    return (
        <>

<div className="bulldogsExchange-footerCont">
          <div className="bulldogsExchange-footerLogo">
            <img
              src={Footerlogo}
              alt="NU Logo"
              className="logoImage"
              style={{
                marginRight: "10px",
                marginLeft: "60px",
              }}
            />
          </div>

          <div className="bulldogsExchange-footerText">
            <div className="bulldogsExchange-footerTextTop">
              <span
                class="material-symbols-outlined"
                style={{
                  color: "#FFF",
                  margin: "10px",
                  marginLeft: "-3px",
                }}
              >
                info
              </span>
              <p>ABOUT NU-D HUB</p>
            </div>

            <p
              style={{
                margin: "0",
              }}
            >
              All Rights Reserved. National University
            </p>

            <div className="bulldogsExchange-footerTextBottom">
              <hr className="border bulldogsExchange-custom-border border-2 opacity-100" />
              <p style={{ lineHeight: "19px" }}>
                The NU-D Hub system offers real-time updates on Bulldogs
                Exchange, a feedback platform, event calendars, and access to
                exclusive promos for NU Dasmariñas students, faculty, and staff.
              </p>
            </div>
          </div>

          <div className="bulldogsExchange-footerText2">
            <div className="bulldogsExchange-footerText2-detail1">
              <img src={phone} style={{ width: "20px", height: "20px" }} />
              <p> CONTACT US</p>
            </div>

            <div className="bulldogsExchange-footerText2-detail2">
              <img src={location} style={{ width: "20px", height: "20px" }} />
              <p>
                Governor’s Drive, Sampaloc 1, City of Dasmariñas, Cavite 4114
              </p>
            </div>

            <div className="bulldogsExchange-footerText2-detail3">
              <img src={phone} style={{ width: "20px", height: "20px" }} />
              <p>09399151561 (Smart) / 09661381357 (Globe)</p>
            </div>

            <div className="bulldogsExchange-footerText2-detail4">
              <img src={mail} style={{ width: "20px", height: "20px" }} />
              <p> admissions@nu-dasma.edu.ph</p>
            </div>

            <div className="bulldogsExchange-footerText2-detail5">
              <img src={schedule} style={{ width: "20px", height: "20px" }} />
              <p>
                Service Hours : Monday - Friday (8:30 AM - 5:30 PM); Saturday
                (8:30 AM - 12:30 PM)
              </p>
            </div>
          </div>
        </div>
        
        </>

    )
}

export default Footer;