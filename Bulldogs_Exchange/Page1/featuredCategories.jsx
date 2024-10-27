import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FCardCateg from "./featuredCategTemplate.jsx";
import "./featuredCategories.css";
import axios from "axios";

export default function FeaturedCategories() {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const handleItemClick = (id, stock, price, name, description, image) => {
    console.log("Item clicked", id);
    navigate("/nud-hub/BeProductPage", {
      state: { id, stock, price, name, description, image },
    });
  };

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost/nud-hub/API/apiCalls/read/readBEProductData.php")
      .then(function (response) {
        console.log(response.data);
        setProductData(response.data.data);
      })
      .catch(function (error) {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <>
      <h1 className="categHeader">BULLDOGS EXCHANGE</h1>

      <div className="container-featured">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
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
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
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
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
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
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
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
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
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

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-popular"
            role="tabpanel"
            aria-labelledby="pills-popular-tab"
            tabIndex="0"
          >
            <div className="fcategoryList">
              <div className="row row-cols-1 row-cols-md-4 g-3 mt-3">
                {productData.map((product, index) => (
                  <FCardCateg
                    key={index}
                    category={product.item_name}
                    image={product.item_image}
                    price={product.price}
                    stock={product.quantity}
                    onClick={() =>
                      handleItemClick(
                        product.item_id,
                        product.quantity,
                        product.price,
                        product.item_name,
                        product.description,
                        product.item_image
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="pills-rated"
            role="tabpanel"
            aria-labelledby="pills-rated-tab"
            tabIndex="0"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="pills-uniform"
            role="tabpanel"
            aria-labelledby="pills-uniform-tab"
            tabIndex="0"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="pills-tumbler"
            role="tabpanel"
            aria-labelledby="pills-tumbler-tab"
            tabIndex="0"
          >
            ...
          </div>
        </div>
      </div>
    </>
  );
}