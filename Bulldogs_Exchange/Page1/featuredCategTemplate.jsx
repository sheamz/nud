import React from "react";
import "./featuredCategTemplate.css";

export default function CardCategTemplate({ category, price, stock, onClick, image }) {

  return (
    <>
      <div
        className="fcardCont col"
        onClick={onClick}
        style={{
          cursor: "pointer",
        }}
      >
        <div className="cardBody h-100">
          <img src={image} class="card-img-top" style={{height: "200px", objectFit: 'contain'}} alt="image" />
          <div className="row">
            <div className="col">
              <div className="cardBodyContent">
                <div className="cardTitle">
                  <h4>{category}</h4>
                </div>
                <div className="cardText">
                  <p>
                    PHP {price} | STOCKS: {stock}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="col-4"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                class="badge rounded-pill bg-warning"
                style={{ color: "#35408E" }}
              >
                <i
                  className="fas fa-star"
                  style={{ color: "white", marginRight: "5px" }}
                ></i>
                4.8
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
