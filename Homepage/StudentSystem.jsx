import React from "react";
import { useNavigate } from "react-router-dom";
import Nu_logo from "../assets/images/NU-logo.png";
import sems from "../assets/images/sems.png";
import feedback from "../assets/images/feedbacksys.png";
import stocknyu from "../assets/images/stocknyu.png";


function StudentSystem() {

    const navigate = useNavigate();
    const handleLogin = () => {
      navigate("/");
    };
  return (
    <>
      <div className="row systems" style={{ marginTop: "10%", marginBottom:"10%" }}>
        <p className="title">Student Systems</p>
        <p className="subtitle">Integrated various systems for your ease</p>
        <div className="container-student-systems">
          <div className="row m-0 p-0" style={{ width:'70%' }}>
            <div className="col-md-4">
              <div className="card" onClick={handleLogin}>
                <div className="card-body">
                  <h5 className="card-title">StockNYU</h5>
                  <img src={stocknyu} alt="NU-D HUB" />
                  <div className="alignment">
                  <p className="card-text">
                  Efficiently track, manage, and optimize stock levels of Bulldogs Exchange to ensure smooth operations and availability of essential resources.
                  </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4" onClick={handleLogin}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Tinig Nationalian</h5>
                  <img src={feedback} alt="Student Feedback" />
                  <div className="alignment">
                  <p className="card-text">
                  Empower students to voice their opinions and improve the learning experience with the Student Feedback System.
                  </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card" onClick={handleLogin}>
                <div className="card-body">
                  <h5 className="card-title">SEMS</h5>
                  <img src={sems} alt="SEMS" />
                  <div className="alignment">
                  <p className="card-text">
                  Manage and streamline all student events effortlessly with Student Event Management System.
                  </p>
                  
                  </div>
                </div>
              </div>
            </div>
            </div>


        </div>
        
      </div>
    </>
  );
}

export default StudentSystem;
