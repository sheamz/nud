import React from "react";
import "./EventItemTemplate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faClock,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function EventItemTemplate({
  dateBox,
  title,
  date,
  location,
  month,
  day,
}) {
  return (
    <div className="eventItemTemplate-parentCont">
      {/* Date Box Section */}
      <div className="dateBox">
        <p className="dateBox-month">{month}</p>
        <p className="dateBox-day">{day}</p>
      </div>

      {/* Event Details Section */}
      <div className="eventContent">
        <h4 className="eventTitle">{title}</h4>
        <div className="eventInfo">
          <p className="eventDate">
            <FontAwesomeIcon icon={faCalendarAlt} className="eventIcon" />{" "}
            {date}
          </p>
          <p className="eventLocation">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="eventIcon" />{" "}
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}
