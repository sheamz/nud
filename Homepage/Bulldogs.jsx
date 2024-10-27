import React, { useState, useEffect } from "react";
import "../assets/css/Bulldogs.css";
import axios from "axios";
import FeaturedItemTemplate from "../Bulldogs_Exchange/Page1/featuredCategTemplate.jsx";
import { useNavigate } from "react-router-dom";

function Bulldogs() {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost/nud-hub/API/apiCalls/read/readBEProductData.php")
      .then(function (response) {
        // console.log(response.data);
        setProductData(response.data.data);
      })
      .catch(function (error) {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <>
      <div id="Shop"></div>
      <div
        className="row bulldog"
        style={{ marginLeft: "0", width: "100%", marginTop: "10%" }}
      >
        <div className="row" style={{ width: "100%", marginLeft: 0 }}>
          <div className="col-12">
            <h4>Bulldogs Exchange</h4>
            <p className="subtitle">
              View all National University's products in one platform
            </p>
          </div>
        </div>

        <div className="container content">
          <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-featured-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-featured"
                type="button"
                role="tab"
                aria-controls="pills-featured"
                aria-selected="false"
                disabled
                style={{ color: "gray" }}
              >
                Featured Categories
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="pills-popular-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-popular"
                type="button"
                role="tab"
                aria-controls="pills-popular"
                aria-selected="true"
              >
                Popular
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-rated-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-rated"
                type="button"
                role="tab"
                aria-controls="pills-rated"
                aria-selected="false"
              >
                Highly Rated
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-uniform-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-uniform"
                type="button"
                role="tab"
                aria-controls="pills-uniform"
                aria-selected="false"
              >
                Uniform
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="pills-tumbler-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-tumbler"
                type="button"
                role="tab"
                aria-controls="pills-tumbler"
                aria-selected="false"
              >
                Tumbler
              </button>
            </li>
          </ul>

          <div class="tab-content" id="pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="pills-popular"
              role="tabpanel"
              aria-labelledby="pills-popular-tab"
              tabindex="0"
            >
              <div className="row row-cols-1 row-cols-md-4 g-3 mt-3">
              {productData.slice(0, 8).map((product, index) => (
                  <FeaturedItemTemplate
                    key={index}
                    category={product.item_name}
                    image={product.item_image}
                    price={product.price}
                    stock={product.quantity}
                  />
                ))}
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="pills-rated"
              role="tabpanel"
              aria-labelledby="pills-rated-tab"
              tabindex="0"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="pills-uniform"
              role="tabpanel"
              aria-labelledby="pills-uniform-tab"
              tabindex="0"
            >
              ...
            </div>
            <div
              class="tab-pane fade"
              id="pills-tumbler"
              role="tabpanel"
              aria-labelledby="pills-tumbler-tab"
              tabindex="0"
            >
              ...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bulldogs;
