import React from "react";
import "./ViewAllEventPage.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import FeaturedNewsTemplate from "../Pages/FeaturedNewsTemplate.jsx";
import AllEventContainer from "./AllEventContainer.jsx";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

export default function ViewAllEventPage() {
  const [events, setEvents] = useState([]);
  const [formatDay, setFormatDay] = useState("");
  const [formatMonth, setFormatMonth] = useState("");
  const [featured, setFeatured] = useState([]);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
      .get("http://localhost/nud-hub/API/apiCalls/read/readEvents.php")
      .then(function (response) {
        // console.log(response.data);

        if (response.data.status == 200) {
          setEvents(response.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
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
  }, []);

  const formatDate = (mysqlDate) => {
    const date = new Date(mysqlDate);
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase();
    const day = date.getDate();
    return { month, day };
  };


  return (
    <>
      <div className="calendar-section">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events.map((event) => {
            return {
              title: event.title,
              start: event.event_start,
              end: event.event_end,
            };
          })}
        />
      </div>

      <hr className="border beProductPage-border-custom border-1 opacity-100" />

      <div className="list-container">
        <h4 className="title">EVENTS LIST</h4>

        <div className="row">
          <div className="col-8">
            <AllEventContainer comments={events} formatter={formatDate} />
          </div>
          <div className="col-4">
            <FeaturedNewsTemplate news={featured} />
          </div>
        </div>
      </div>
    </>
  );
}
