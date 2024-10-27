import React from "react";
import "../assets/css/Maps.css";
import map1 from "../assets/images/4th FLOOR BLUEPRINT.png";
import map2 from "../assets/images/5th FLOOR BLUEPRINT.png";


function Maps() {
  return (
    <>
        <div className="mapstart" id="Map" ></div>
        <div className="row maps" style={{ marginTop: "10%", marginBottom:"10%", marginLeft: '0' }} >
            <div className="col-12" >
            <h4>University Map</h4>
            <p className="subtitle">See available offices in the campus</p>
            </div>

            <div className="container map">
              <div className="fourth">
                <h5>4th Floor</h5>
                <img src={map1}></img>
              </div>

              <div className="fifth">
                <h5>5th Floor</h5>
                <img src={map2}></img>
              </div>
              
            </div>
            
        </div>
    </>
  );
}

export default Maps;