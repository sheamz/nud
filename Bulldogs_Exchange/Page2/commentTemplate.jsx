import React, { useState } from "react";
import "./commentTemplate.css";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function CommentTemplate({
  profile_picture,
  name,
  rating,
  date,
  comment,
}) {
  const [value, setValue] = useState(2);
  
  return (
    <>
      <hr className="border commentTemplate-border-custom border-1 opacity-100" />
      <div className="contentTemplate-parentCont">
        <img
          src={profile_picture}
          alt="Profile picture of the reviewer"
          className="contentTemplateProfilePic"
        />
        <div className="reviewContent">
          <div className="reviewHeader">
            <h4>{name}</h4>
            <Box sx={{ marginLeft: '-4px'}}>
              <Rating
                name="read-only"
                value={rating}
                readOnly
              />
            </Box>
            <p className="date">{date}</p>
          </div>
          <div className="reviewBody">
            <h6>Comment</h6>
            <p>{comment}</p>
          </div>
        </div>
      </div>
    </>
  );
}
