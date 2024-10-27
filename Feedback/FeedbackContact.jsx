import React from "react";
import "./FeedbackContact.css";

function FeedbackContact({ handleChange, contactInfo }) {
  return (
    <>
      <div className="feedback-contact">
        <div className="contact-title">
          <h1 className="contitle">CONTACT INFORMATION</h1>
        </div>

        <div className="contact-input">
          <div className="input-row">
            <div className="input-group mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  value={contactInfo.firstName}
                  onChange={handleChange}
                  disabled
                />
                <label htmlFor="floatingInputGroup1">First Name</label>
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  value={contactInfo.lastName}
                  onChange={handleChange}
                  disabled
                />
                <label htmlFor="floatingInputGroup2">Last Name</label>
              </div>
            </div>
          </div>

          <div className="input-row">
            <div className="input-group mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Email Address"
                  value={contactInfo.email}
                  onChange={handleChange}
                  disabled
                />
                <label htmlFor="floatingInputGroup3">Email Address</label>
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Phone Number"
                  value={contactInfo.phone}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInputGroup4">Phone Number</label>
              </div>
            </div>
          </div>

          <div className="input-row">
            <div className="input-group mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="program"
                  placeholder="Program"
                  value={contactInfo.program}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInputGroup5">Program</label>
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="yearLevel"
                  placeholder="Year Level"
                  value={contactInfo.yearLevel}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInputGroup6">Year Level</label>
              </div>
            </div>
            <div className="input-group mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="section"
                  placeholder="Section"
                  value={contactInfo.section}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInputGroup7">Section</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackContact;
