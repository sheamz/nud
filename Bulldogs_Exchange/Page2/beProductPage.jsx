import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./beProductPage.css";
import uniformSizes from "../../assets/uniformSizes.png";
import ProductReviewContainer from "./ProductReviewContainer.jsx";
import FeaturedNewsTemplate from "../../Pages/FeaturedNewsTemplate.jsx";
import axios from "axios";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useCookies } from "react-cookie";

export default function BeProductPage() {
  const location = useLocation();
  const [value, setValue] = useState({
    rating: 0,
    total_review: 0,
    total_rating: 0,
  });
  const { id, stock, price, name, description, image } = location.state || {};
  const [review, setReview] = useState([]);
  const [cookies] = useCookies(["user_token"]);
  const [comments, setComments] = useState({
    comments: "",
    sender_id: cookies.user_token,
    to_review: id,
    rating: "",
  });
  const [item, setItem] = useState({});
  const [featured, setFeatured] = useState([]);
  const [filter, setFilter] = useState("new");

  useEffect(() => {
    axios
      .post(
        "http://localhost/nud-hub/API/apiCalls/read/readBulldogExchangeReviews.php",
        { item_id: id, filter: filter },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response.data.data);
        setReview(response.data.data);
      });

    axios
      .get(
        "https://graph.facebook.com/v21.0/me?fields=feed.limit(4){message,full_picture,permalink_url,created_time,comments}&access_token=EAB8tbtEZAnssBO2KYPN3jlxkUypeYQFoNsmxEtzasE9AJfg33TOOrKns3EykMuDfHND4I1Kl1nsbgbWLEXHEwZBgEMZA6QW9buL8rkBxi4WeTExDgOZBnfFddqwe4CZB6Vk51YWx7AJ7YoG2ZARPY4QZByhYOCfI07bsTrJ1ApVXtvvTjeoDUf1PXoSrSLK2pOg"
      )
      .then((res) => {
        // console.log(res.data.data);
        // setFbData(res.data.feed.data);
        setFeatured(res.data.feed.data);
        // console.log(res.data.data[0].comments.data);
      })
      .catch();

    axios
      .post(
        "http://localhost/nud-hub/API/apiCalls/read/readBulldogExchangeTotalReviews.php", { item_id: id },
      ).then(function (response){
        console.log(response.data);
        if(response.data.status == "200"){
          let value = response.data.data;
          setValue(values => ({...values, rating: value.rating_star, total_review: value.total_review, total_rating: value.total_rating}));
        }
        
      })
  }, [id, filter]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setComments((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost/nud-hub/API/apiCalls/create/insertComment.php",
        comments,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log(response.data);
      });
  };


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="beProductPage-productContainer">
        <div className="row">
          <div className="col-6">
            <div className="beProductPage-productImage1">
              <img src={image} alt="NU Trad Unif" className="productImage" />
            </div>
            <div className="beProductPage-productImage2">
              <div className="row row-cols-3">
                <div className="col">
                  <img src={image} alt="NU Trad Unif" className="productImage" />
                </div>
                <div className="col">
                  <img src={image} alt="NU Trad Unif" className="productImage" />
                </div>
                <div className="col">
                  <img
                    src={uniformSizes}
                    alt="NU Unif Sizes"
                    className="productImage"
                  />
                </div>
                
              </div>
              
            </div>
          </div>

          <div className="col-6">
            <div className="beProductPage-productInfoLabel">
              <h4>{name}</h4>
            </div>

            <div className="beProductPage-productInfoDescrip">
              <h1 className="title">PRODUCT DETAILS</h1>
              <div className="row">
                <div className="col-auto">
                  <h1 className="price">PHP {price}</h1>
                </div>
                <div className="col-auto">
                  <Box sx={{ marginTop: "-7px" }}>
                    <Rating name="simple-controlled" value={value.rating} readOnly />
                  </Box>
                </div>
                <div className="col-auto">
                  <p className="ratings">{value.total_rating} Ratings</p>
                </div>
              </div>

              <table className="beProductPage-table">
                <tbody>
                  <tr>
                    <th>
                      <i className="fas fa-info-circle"></i> Description
                    </th>
                    <td>{description}</td>
                  </tr>
                  <tr>
                    <th>
                      <i className="fas fa-box"></i> Stock
                    </th>
                    <td>Stock: {stock}</td>
                  </tr>
                  <tr>
                    <th>
                      <i className="fas fa-palette"></i> Color
                    </th>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>
                      <i className="fas fa-tshirt"></i> Sizes
                    </th>
                    <td>
                      <span className="badge badge-pill badge-primary">XS</span>
                      <span className="badge badge-pill badge-primary">S</span>
                      <span className="badge badge-pill badge-primary">M</span>
                      <span className="badge badge-pill badge-primary">L</span>
                      <span className="badge badge-pill badge-primary">XL</span>
                    </td>
                  </tr>
                  <tr>
                    <th>
                      <i className="fas fa-tags"></i> Category
                    </th>
                    <td>Uniform</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <hr className="border beProductPage-border-custom border-1 opacity-100" />

      <div className="product-reviews-container">
        <h4 className="title">PRODUCT REVIEWS</h4>
      </div>

      <div className="ProductReviewContainerCont">
        <div className="row">
          <div className="col-8">
            <ProductReviewContainer
              comments={review}
              id={id}
              filter={filter}
              image={image}
              setFilter={setFilter}
              information={value}
            />
          </div>
          <div className="col-4">
            <FeaturedNewsTemplate news={featured} />
          </div>
        </div>
      </div>
    </>
  );
}
